import TrlBrlCrlForm from "../../../../components/dashboard/forms/TrlBrlCrlForm";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import { useState } from "react";

export default function TrlBrlCrl() {
  const navigate = useNavigate();
  const { id } = useParams(); // Obtener el ID de la evaluación desde la URL
  const [formValues, setFormValues] = useState({ trl: 0, brl: 0, crl: 0 });
  const [generalSummary, setGeneralSummary] = useState("");

  const handleSelectionChange = (values: { trl: number; brl: number; crl: number }) => {
    setFormValues(values);
    setGeneralSummary(calculateGeneralSummary(values)); // Actualizar el resumen general
    console.log(values);
  };

  const calculateGeneralSummary = ({ trl, brl, crl }: { trl: number; brl: number; crl: number }) => {
    if (trl === 9 && brl === 9 && crl === 9) {
      return "Escalar las tecnologías, el modelo de negocio y la propuesta comercial en función de los aspectos de usabilidad y valores agregados.";
    }

    const trlSummary = trl <= 5 ? 1 : trl <= 9 ? 2 : 3;
    const brlSummary = brl <= 5 ? 1 : brl <= 9 ? 2 : 3;
    const crlSummary = crl <= 5 ? 1 : crl <= 9 ? 2 : 3;

    const finalSummary = Math.max(trlSummary, brlSummary, crlSummary);

    switch (finalSummary) {
      case 1:
        return "Ajustar todo el criterio tecnológico, empresarial y comercial con el fin de desarrollar un concepto técnico y comercial adecuado.";
      case 2:
        return "Revisar aspectos que están en menos desarrollo para lograr el equilibrio integral entre los aspectos tecnológicos, empresariales y comerciales.";
      case 3:
        return "Escalar las tecnologías, el modelo de negocio y la propuesta comercial en función de los aspectos de usabilidad y valores agregados.";
      default:
        return "";
    }
  };

  const handleSave = async () => {
    const payload = {
      trl: formValues.trl,
      brl: formValues.brl,
      crl: formValues.crl,
      generalSummary: generalSummary,
    };

    if (!id) {
      alert("No se encontró el ID de la evaluación.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/evaluaciones/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resultado: payload }),
      });

      if (response.ok) {
        alert("Evaluación actualizada correctamente.");
      } else {
        console.error("Error en la actualización:", response.statusText);
        alert("Hubo un error al actualizar la evaluación.");
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      alert("Hubo un error al conectar con el servidor.");
    }
  };

  const handleReturn = () => {
    navigate("/dashboard");
  };

  return (
    <DashboardLayout>
      <TrlBrlCrlForm
        onChange={handleSelectionChange}
        onSave={handleSave}
        onReturn={handleReturn}
      />
    </DashboardLayout>
  );
}
