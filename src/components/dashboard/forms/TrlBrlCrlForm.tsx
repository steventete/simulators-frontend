"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertCircle, ArrowLeft, Save } from 'lucide-react';
import { Link } from "react-router-dom";

interface TrlBrlCrlFormProps {
  onChange: (values: { trl: number; brl: number; crl: number }) => void;
  onSave: () => void;
  onReturn: () => void;
}

const TrlBrlCrlForm = ({ onChange, onSave, onReturn }: TrlBrlCrlFormProps) => {
  const [trlValue, setTrlValue] = useState(0);
  const [brlValue, setBrlValue] = useState(0);
  const [crlValue, setCrlValue] = useState(0);

  useEffect(() => {
    onChange({ trl: trlValue, brl: brlValue, crl: crlValue });
  }, [trlValue, brlValue, crlValue, onChange]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => {
    setter(parseInt(e.target.value, 10));
  };

  const getLevelDescription = (value: number, type: string) => {
    const descriptions: Record<string, string[]> = {
      TRL: [
        "Preparación de aplicación de conceptos investigativos, científicos y técnicos",
        "Estudio y análisis de usos y casos",
        "Estudio y análisis de laboratorio o análisis Técnico de potenciales usos",
        "Componentes integrados en el laboratorio o análisis Técnico",
        "Componentes integrados que muestran funcionalidad",
        "Prototipo a escala de Ingeniería y probado en simulaciones de situaciones",
        "Prototipo real funcionando en ambiente de funcionalidad",
        "Tecnología funcionando en ámbito real como se esperaba",
        "Tecnología lista para procesos de generación de valor",
      ],
      BRL: [
        "Concepto inicial hipotético de negocio",
        "Descripción de concepto de negocio",
        "Descripción básica de modelo de negocio",
        "Primera versión de modelo de negocio",
        "Prueba inicial de modelo de negocio",
        "Producto mínimo viable verificado en potenciales clientes",
        "Producto mercado alineado/primera venta",
        "Tecnología funcionando en ámbito real como se esperaba",
        "Afinamiento del modelo y escalamiento a Mercado completo",
      ],
      CRL: [
        "Hipótesis hacia una expectativa al Mercado",
        "Conocimiento del Mercado",
        "Aplicación de Tecnologías potenciales",
        "Propuesta de valor",
        "Alineación de Mercado",
        "Optimización de Productos hacia soluciones",
        "Validación del Modelo financiero",
        "Introducción al Mercado",
        "Lanzamiento completo",
      ],
    };

    return descriptions[type][value - 1] || "";
  };

  const calculateGeneralSummary = () => {
    if (trlValue === 9 && brlValue === 9 && crlValue === 9) {
      return "Escalar las tecnologías, el modelo de negocio y la propuesta comercial en función de los aspectos de usabilidad y valores agregados.";
    }

    const trlSummary = trlValue <= 5 ? 1 : trlValue <= 9 ? 2 : 3;
    const brlSummary = brlValue <= 5 ? 1 : brlValue <= 9 ? 2 : 3;
    const crlSummary = crlValue <= 5 ? 1 : crlValue <= 9 ? 2 : 3;

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

  const renderRadioButtons = (
    type: string,
    value: number,
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => (
    <div className="mb-6">
      <p className="text-sm font-medium mb-2">{type}</p>
      <div className="flex flex-wrap gap-2">
        {[...Array(9)].map((_, index) => {
          const level = index + 1;
          return (
            <label
              key={level}
              className="flex items-center justify-center cursor-pointer"
            >
              <input
                type="radio"
                name={type}
                value={level}
                checked={value === level}
                onChange={(e) => handleChange(e, setter)}
                className="sr-only"
              />
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                  value === level
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {level}
              </motion.div>
            </label>
          );
        })}
      </div>
    </div>
  );

  const renderProgressBar = (type: string, value: number) => (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium">{type}</span>
        <span className="font-bold">{value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <motion.div
          className="bg-blue-600 h-3 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(value / 9) * 100}%` }}
          transition={{ duration: 0.5 }}
        ></motion.div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Evaluación TRL-BRL-CRL
      </h2>
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        <div className="w-full lg:w-1/2">
          {renderRadioButtons("TRL (Tecnológica)", trlValue, setTrlValue)}
          {renderRadioButtons("BRL (Empresarial)", brlValue, setBrlValue)}
          {renderRadioButtons("CRL (Comercial)", crlValue, setCrlValue)}
        </div>
        <div className="w-full lg:w-1/2">
          <h3 className="text-lg font-semibold mb-4">Gráficos</h3>
          {renderProgressBar("TRL", trlValue)}
          {renderProgressBar("BRL", brlValue)}
          {renderProgressBar("CRL", crlValue)}
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Resultados</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["TRL", "BRL", "CRL"].map((type, index) => {
            const value = type === "TRL" ? trlValue : type === "BRL" ? brlValue : crlValue;
            return (
              <motion.div
                key={index}
                className="bg-gray-100 rounded-lg p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <h4 className="text-md font-medium mb-2">{type}</h4>
                <p className="text-sm">
                  {getLevelDescription(value, type)}
                </p>
              </motion.div>
            );
          })}
        </div>
        <motion.div
          className="bg-blue-100 rounded-lg p-4 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <h4 className="text-md font-medium mb-2">Resumen General</h4>
          <p className="text-sm">
            {calculateGeneralSummary()}
          </p>
        </motion.div>
      </div>

      <div className="mt-8 flex items-start gap-2 text-sm text-gray-600 mb-8 bg-blue-50 p-4 rounded-lg">
        <AlertCircle size={20} className="flex-shrink-0 mt-0.5 text-blue-600" />
        <p>
          Esta evaluación proporciona una visión general de los niveles de
          preparación tecnológica, empresarial y comercial. Utilice esta
          información para identificar áreas de mejora y planificar los próximos
          pasos en el desarrollo de su proyecto.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Link
        to={"/dashboard"}
          onClick={onReturn}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
        >
          <ArrowLeft size={20} />
          Volver al dashboard
        </Link>
        <button
          onClick={onSave}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Save size={20} />
          Guardar evaluación
        </button>
      </div>
    </div>
  );
};

export default TrlBrlCrlForm;

