import { FastifyReply, FastifyRequest } from "fastify";
import { isXlsxFile } from "helpers/valid-format-xlsx";
import * as XLSX from "xlsx";
import { z } from "zod";

const ContactSchemaRequest = z.object({
  name: z.string(),
  identifier: z.string().email(),
});

type ContactSchemaRequest = z.infer<typeof ContactSchemaRequest>;

export async function importContacts(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const file = await request.file();

    if (!file) {
      return reply.status(400).send({ message: "no file found." });
    }

    if (!isXlsxFile(file.mimetype)) {
      return reply.status(400).send({
        message: "Invalid file format. Upload an Excel file (.xlsx).",
      });
    }

    const workbook = XLSX.read(await file.toBuffer(), { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const contactsToJSON = XLSX.utils
      .sheet_to_json<ContactSchemaRequest>(worksheet)
      .map((row) => ({
        name: row.name,
        identifier: row.identifier,
      }));

    console.log(contactsToJSON);
  } catch (error) {
    return reply.status(500).send({
      message: "Error processing the file.",
    });
  }
}
