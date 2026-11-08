import path from "path";
import ExcelJS from "exceljs";
import PDFDocument from "pdfkit";
import { AlignmentType, Document, HeadingLevel, Packer, Paragraph, Table, TableCell, TableRow, TextRun, WidthType } from "docx";

export type ReportFormat = "docx" | "xlsx" | "pdf";
export interface Report {
  title: string;
  subtitle?: string;
  columns: { key: string; title: string; width?: number; money?: boolean }[];
  rows: Record<string, unknown>[];
  totals?: string[];
}

export const REPORT_MIME: Record<ReportFormat, string> = {
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  pdf: "application/pdf",
};

const cell = (v: unknown, money?: boolean) =>
  v == null ? "" : money && typeof v === "number" ? v.toFixed(2) : v instanceof Date ? v.toLocaleDateString("ru-RU") : String(v);

export async function toDocx(r: Report): Promise<Buffer> {
  const header = new TableRow({
    tableHeader: true,
    children: r.columns.map((c) => new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: c.title, bold: true })] })] })),
  });
  const body = r.rows.map((row) => new TableRow({
    children: r.columns.map((c) => new TableCell({ children: [new Paragraph({ text: cell(row[c.key], c.money), alignment: c.money ? AlignmentType.RIGHT : AlignmentType.LEFT })] })),
  }));
  const doc = new Document({
    styles: { default: { document: { run: { font: "Times New Roman", size: 24 } } } },
    sections: [{
      children: [
        new Paragraph({ text: r.title, heading: HeadingLevel.HEADING_1, alignment: AlignmentType.CENTER }),
        ...(r.subtitle ? [new Paragraph({ text: r.subtitle, alignment: AlignmentType.CENTER })] : []),
        new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: [header, ...body] }),
        ...(r.totals ?? []).map((t) => new Paragraph({ children: [new TextRun({ text: t, bold: true })], spacing: { before: 120 } })),
      ],
    }],
  });
  return Packer.toBuffer(doc);
}

export async function toXlsx(r: Report): Promise<Buffer> {
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet(r.title.slice(0, 31));
  ws.addRow([r.title]).font = { bold: true, size: 14 };
  if (r.subtitle) ws.addRow([r.subtitle]);
  ws.addRow([]);
  const head = ws.addRow(r.columns.map((c) => c.title));
  head.font = { bold: true };
  r.rows.forEach((row) => ws.addRow(r.columns.map((c) => (row[c.key] instanceof Date ? row[c.key] : row[c.key] ?? ""))));
  r.columns.forEach((c, i) => {
    ws.getColumn(i + 1).width = c.width ?? 18;
    if (c.money) ws.getColumn(i + 1).numFmt = "0.00";
  });
  (r.totals ?? []).forEach((t) => (ws.addRow([t]).font = { bold: true }));
  return Buffer.from(await wb.xlsx.writeBuffer());
}

const FONT_DIR = path.dirname(require.resolve("dejavu-fonts-ttf/ttf/DejaVuSans.ttf"));

export function toPdf(r: Report): Promise<Buffer> {
  return new Promise((resolve) => {
    const doc = new PDFDocument({ size: "A4", margin: 40 });
    const chunks: Buffer[] = [];
    doc.on("data", (c) => chunks.push(c));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.registerFont("main", path.join(FONT_DIR, "DejaVuSans.ttf"));
    doc.registerFont("bold", path.join(FONT_DIR, "DejaVuSans-Bold.ttf"));
    doc.font("bold").fontSize(14).text(r.title, { align: "center" });
    if (r.subtitle) doc.font("main").fontSize(10).text(r.subtitle, { align: "center" });
    doc.moveDown();
    const total = r.columns.reduce((s, c) => s + (c.width ?? 18), 0);
    const widths = r.columns.map((c) => ((c.width ?? 18) / total) * (doc.page.width - 80));
    const drawRow = (values: string[], bold = false) => {
      const y = doc.y;
      const h = Math.max(...values.map((v, i) => doc.font(bold ? "bold" : "main").fontSize(9).heightOfString(v, { width: widths[i] - 6 }))) + 6;
      if (y + h > doc.page.height - 40) doc.addPage();
      let x = 40;
      const top = doc.y;
      values.forEach((v, i) => {
        doc.rect(x, top, widths[i], h).stroke();
        doc.text(v, x + 3, top + 3, { width: widths[i] - 6 });
        x += widths[i];
      });
      doc.y = top + h;
    };
    drawRow(r.columns.map((c) => c.title), true);
    r.rows.forEach((row) => drawRow(r.columns.map((c) => cell(row[c.key], c.money))));
    doc.moveDown();
    (r.totals ?? []).forEach((t) => doc.font("bold").fontSize(10).text(t, 40));
    doc.end();
  });
}

export function render(r: Report, format: ReportFormat) {
  return format === "docx" ? toDocx(r) : format === "xlsx" ? toXlsx(r) : toPdf(r);
}
