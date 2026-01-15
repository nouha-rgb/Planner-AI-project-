import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default function PlanningTable({ data }) {
  if (!data) return <div>Chargement...</div>;

  const { hourly_plan, description } = data;
  const { hourly_plan: planRows, hours } = hourly_plan;

  // 1️⃣ Fonction pour générer le PDF
  const downloadPDF = () => {
  try {
    const doc = new jsPDF();
    const tableColumn = ["Jour", "Ville", ...hours];
    const tableRows = planRows.map((row) =>
      [row.Jour, row.Ville, ...hours.map((h) => row[h])]
    );
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [22, 160, 133] },
    });
    doc.save("planning.pdf");
  } catch (err) {
    console.error("Erreur PDF:", err);
  }
};

  return (
    <div>
      <h2>Planning horaire</h2>
      <table border="1" cellPadding="5" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Jour</th>
            <th>Ville</th>
            {hours.map((hour) => (
              <th key={hour}>{hour}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {planRows.map((row, idx) => (
            <tr key={idx}>
              <td>{row.Jour}</td>
              <td>{row.Ville}</td>
              {hours.map((hour) => (
                <td key={hour}>{row[hour]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Résumé du voyage</h2>
      <div dangerouslySetInnerHTML={{ __html: description.description }} />

      <button onClick={downloadPDF} style={{ marginTop: "20px" }}>
        Télécharger en PDF
      </button>
    </div>
  );
}
