import prisma from '@/prisma';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

export class InvoiceController {
  async createInvoice(req: Request, res: Response, next: NextFunction) {
    const {
      productIds,
      invoiceStatus,
      clientCode,
      name,
      address,
      phone,
      email,
      qtys,
      paymentType,
      bankAccount,
      accountName,
      accountNumber,
      lastName,
      firstName,
      addRecurringDate,
      companyName,
      userAddress,
      userPhone,
    } = req.body;

    try {
      const findUser = await prisma.user.findUnique({
        where: {
          identificationId: res.locals.decrypt.identificationId,
        },
      });

      if (!findUser) {
        return res.status(404).send({
          success: false,
          message: 'Cannot find user',
        });
      }

      if (
        !Array.isArray(productIds) ||
        !Array.isArray(qtys) ||
        productIds.length !== qtys.length
      ) {
        return res.status(400).send({
          success: false,
          message:
            'Product IDs and quantities must be arrays of the same length',
        });
      }

      const findProducts = await prisma.product.findMany({
        where: {
          id: { in: productIds },
        },
      });

      if (!findProducts || findProducts.length !== productIds.length) {
        return res.status(404).send({
          success: false,
          message: 'Cannot find your products',
        });
      }

      let totalAmount = 0;
      let subTotal = 0;

      for (let i = 0; i < findProducts.length; i++) {
        const product = findProducts[i];
        const qty = qtys[i];
        totalAmount += product.price * qty;
        subTotal += product.price * qty;
      }

      // Prisma transaction for invoice, client, and payment details
      const result = await prisma.$transaction(async (prisma) => {
        const findPaymentType = await prisma.paymentoptions.findFirst({
          where: {
            paymentType,
          },
        });

        if (!findPaymentType) {
          throw new Error('Cannot find payment type');
        }

        if (findPaymentType.paymentType === 'BANK_TRANSFER') {
          await prisma.paymentdetails.create({
            data: {
              paymentOptId: findPaymentType.id,
              bankAccount,
              accountName,
              accountNumber,
              userId: findUser.id,
            },
          });
        }

        const cliCode = 'CLI-' + uuid();
        let findClient = await prisma.client.findUnique({
          where: { clientCode },
        });

        if (!findClient) {
          findClient = await prisma.client.create({
            data: {
              clientCode: cliCode,
              name,
              address,
              phone,
              email,
              userId: findUser.id,
            },
          });
        }

        const invCode = 'INV-' + uuid();
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + addRecurringDate);

        const newInvoice = await prisma.invoice.create({
          data: {
            invoiceCode: invCode,
            invoiceDate: new Date(),
            nextInvoiceDate: currentDate,
            invoiceStatus: invoiceStatus || 'UNPAID',
            totalAmount,
            subTotal,
            paymentOptId: findPaymentType.id,
            userId: findUser.id,
            clientId: findClient.id,
          },
        });

        const newInvoiceDetails = [];

        for (let i = 0; i < findProducts.length; i++) {
          const product = findProducts[i];
          const qty = qtys[i];

          const newInvoiceDetail = await prisma.invoicedetail.create({
            data: {
              productId: product.id,
              invoiceId: newInvoice.id,
              qty,
              priceUnit: product.price,
              priceTotal: product.price * qty,
            },
          });

          newInvoiceDetails.push(newInvoiceDetail);
        }

        return { newInvoice, newInvoiceDetails };
      });

      return res.status(200).send({
        success: true,
        message: 'Success to create your invoice',
        result: result,
      });
    } catch (error) {
      console.log(error);
      next({
        success: false,
        message: 'Cannot create your invoice',
        error,
      });
    }
  }

  async getInvoice(req: Request, res: Response, next: NextFunction) {
    const { search, startDate, endDate } = req.query;
    try {
      const findUser = await prisma.user.findUnique({
        where: {
          identificationId: res.locals.decrypt.identificationId,
        },
      });

      if (!findUser) {
        return res.status(404).send({
          success: false,
          message: 'User not found',
        });
      }

      let searchResult = {};

      if (search) {
        searchResult = {
          OR: [
            { invoiceCode: { contains: String(search), mode: 'insensitive' } },
            {
              client: {
                name: { contains: String(search), mode: 'insensitive' },
              },
            },
          ],
        };
      }

      if (startDate || endDate) {
        const start = startDate
          ? new Date(String(startDate))
          : new Date('1970-01-01');
        const end = startDate ? new Date(String(endDate)) : new Date();

        if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
          searchResult = {
            ...searchResult,
            invoiceDate: {
              gte: start,
              lte: end,
            },
          };
        } else {
          return res.status(400).send({
            success: false,
            message: 'Invalid date format',
          });
        }
      }

      const findAllInvoiceUser = await prisma.invoice.findMany({
        where: {
          ...searchResult,
          userId: findUser.id,
        },
        include: {
          client: true,
          invoicedetail: {
            include: {
              product: true,
            },
          },
        },
      });

      return res.status(200).send({
        success: true,
        message: 'Find invoice success',
        result: findAllInvoiceUser,
      });
    } catch (error) {
      console.log(error);
      next({
        success: false,
        message: 'Cannot get your invoice',
        error,
      });
    }
  }

  async updateInvoice(req: Request, res: Response, next: NextFunction) {
    const {
      productIds,
      clientCode,
      invoiceStatus,
      nextInvoiceDate,
      addRecurringDate,
      name,
      address,
      phone,
      email,
      qtys,
    } = req.body;

    const { invoiceCode } = req.params;

    try {
      const findUser = await prisma.user.findUnique({
        where: {
          identificationId: res.locals.decrypt.identificationId,
        },
      });

      if (!findUser) {
        return res.status(404).send({
          success: false,
          message: 'Cannot find user',
        });
      }

      const findInvoice = await prisma.invoice.findUnique({
        where: {
          invoiceCode,
        },
      });

      if (!findInvoice) {
        return res.status(404).send({
          success: false,
          message: 'Cannot find your invoice',
        });
      }

      if (
        !Array.isArray(productIds) ||
        !Array.isArray(qtys) ||
        productIds.length !== qtys.length
      ) {
        return res.status(400).send({
          success: false,
          message:
            'Product IDs and quantities must be arrays of the same length',
        });
      }

      const findProducts = await prisma.product.findMany({
        where: {
          id: { in: productIds },
        },
      });

      if (!findProducts || findProducts.length !== productIds.length) {
        return res.status(404).send({
          success: false,
          message: 'Cannot find your products',
        });
      }

      let totalAmount = 0;
      let subTotal = 0;

      for (let i = 0; i < findProducts.length; i++) {
        const product = findProducts[i];
        const qty = qtys[i];
        totalAmount += product.price * qty;
        subTotal += product.price * qty;
      }

      const findInvoiceDetails = await prisma.invoicedetail.findMany({
        where: {
          invoiceId: findInvoice.id,
        },
      });

      if (!findInvoiceDetails) {
        return res.status(404).send({
          success: false,
          message: 'Cannot find invoice details',
        });
      }

      let newNextInvoiceDate = findInvoice.nextInvoiceDate;
      if (addRecurringDate) {
        newNextInvoiceDate = new Date();
        newNextInvoiceDate.setDate(
          newNextInvoiceDate.getDate() + addRecurringDate,
        );
      }

      const result = await prisma.$transaction(async (prisma) => {
        let findClient = await prisma.client.findUnique({
          where: {
            clientCode,
          },
        });

        const cliCode = 'CLI-' + uuid();

        if (!findClient) {
          findClient = await prisma.client.create({
            data: {
              name,
              address,
              clientCode: cliCode,
              phone,
              email,
              userId: findUser.id,
            },
          });
        } else {
          findClient = await prisma.client.update({
            data: {
              name,
              address,
              phone,
              email,
            },
            where: {
              id: findClient.id,
            },
          });
        }

        const updatedInvoice = await prisma.invoice.update({
          data: {
            invoiceStatus: invoiceStatus || findInvoice.invoiceStatus,
            nextInvoiceDate: nextInvoiceDate || newNextInvoiceDate,
            totalAmount,
            subTotal,
            clientId: findClient.id,
          },
          where: {
            id: findInvoice.id,
          },
        });

        // Update or create invoice details for each product
        const updateInvoiceDetails = [];

        for (let i = 0; i < findProducts.length; i++) {
          const product = findProducts[i];
          const qty = qtys[i];

          const existingDetail = findInvoiceDetails[i];

          let updateInvoiceDetail;
          if (existingDetail) {
            // Update existing detail
            updateInvoiceDetail = await prisma.invoicedetail.update({
              data: {
                qty,
                priceUnit: product.price,
                priceTotal: product.price * qty,
              },
              where: {
                id: existingDetail.id,
              },
            });
          } else {
            // Create new detail for product
            updateInvoiceDetail = await prisma.invoicedetail.create({
              data: {
                productId: product.id,
                invoiceId: updatedInvoice.id,
                qty,
                priceUnit: product.price,
                priceTotal: product.price * qty,
              },
            });
          }

          updateInvoiceDetails.push(updateInvoiceDetail);
        }

        return { updatedInvoice, updateInvoiceDetails };
      });

      return res.status(200).send({
        success: true,
        message: 'Update Invoice Success',
        result: result,
      });
    } catch (error) {
      console.log(error);
      next({
        success: false,
        message: 'Cannot update your invoice',
        error,
      });
    }
  }
}
