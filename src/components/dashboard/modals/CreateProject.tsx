"use client";

import { AnimatePresence, type AnimationProps, motion } from "framer-motion";
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useUser } from "../../../context/userContext";

interface CreateProjectProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreateProject = ({ isOpen, onClose }: CreateProjectProps) => {
    const user = useUser();
    const [projectData, setProjectData] = useState({
        nombre: "",
        descripcion: "",
        creador_id: user.cedula,
        creado_en: new Date().toISOString(),
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const variants: { [key: string]: AnimationProps } = {
        overlay: {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            transition: { ease: [0.19, 1, 0.22, 1], duration: 0.4 },
        },
        content: {
            initial: { scale: 0.9, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.9, opacity: 0 },
            transition: { ease: [0.19, 1, 0.22, 1], duration: 0.4 },
        },
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProjectData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch("http://localhost:3000/api/proyectos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(projectData),
            });

            if (response.ok) {
                onClose();
            } else {
                console.error("Error al crear el proyecto");
            }
        } catch (error) {
            console.error("Error al crear el proyecto:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose} /// <reference path="./CreateProject.tsx" />
        >

            <Dialog.Portal forceMount>
                <AnimatePresence mode="popLayout">
                    {isOpen && (
                        <Dialog.Overlay className="fixed top-0 left-0 h-full w-full bg-black bg-opacity-50">
                            <motion.div
                                className="fixed inset-0 bg-black-a10"
                                {...variants.overlay}
                            />
                        </Dialog.Overlay>
                    )}
                </AnimatePresence>
                <AnimatePresence mode="popLayout">
                    {isOpen && (
                        <Dialog.Content className="-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-[450px] z-[9999]">
                            <motion.div
                                className="flex-col overflow-hidden rounded-xl bg-white border border-gray-3 bg-gray-1 sm:w-[384px]"
                                {...variants.content}
                            >
                                <Dialog.Title className="px-6 pt-5 font-semibold text-foreground text-large">
                                    Nuevo Proyecto
                                </Dialog.Title>

                                <form onSubmit={handleSubmit}>
                                    <fieldset className="mb-[15px] flex flex-col gap-4 px-6 py-4">
                                        <label
                                            htmlFor="nombre"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Nombre del Proyecto
                                        </label>
                                        <input
                                            type="text"
                                            id="nombre"
                                            name="nombre"
                                            value={projectData.nombre}
                                            onChange={handleChange}
                                            className="h-[32px] w-full flex-1 rounded-lg border border-gray-4 bg-gray-2 px-2.5 text-[15px] text-default leading-none transition-all placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-green-11 focus:ring-offset-2 focus:ring-offset-gray-1"
                                            placeholder="Ingrese el nombre del proyecto"
                                            required
                                        />
                                    </fieldset>

                                    <fieldset className="mb-[15px] flex flex-col gap-4 px-6 py-4">
                                        <label
                                            htmlFor="descripcion"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Descripción del Proyecto
                                        </label>
                                        <textarea
                                            id="descripcion"
                                            name="descripcion"
                                            value={projectData.descripcion}
                                            onChange={handleChange}
                                            className="h-[100px] w-full flex-1 rounded-lg border border-gray-4 bg-gray-2 px-2.5 text-[15px] text-default leading-none transition-all placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-green-11 focus:ring-offset-2 focus:ring-offset-gray-1 resize-none"
                                            placeholder="Breve descripción del proyecto"
                                            required
                                        />
                                    </fieldset>

                                    <div className="flex justify-between gap-4 border-gray-3 border-t bg-gray-2 px-6 py-5">
                                        <Dialog.Close className="!text-red-600 h-[32px] max-w-fit rounded-lg bg-gray-a3 px-3 transition-all ease-in-out hover:brightness-150">
                                            Cancelar
                                        </Dialog.Close>
                                        <button
                                            type="submit"
                                            className={`!text-blue-600 h-[32px] max-w-fit rounded-lg bg-green-a3 px-3 transition-all ease-in-out hover:brightness-150 ${
                                                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                                            }`}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? "Creando..." : "Guardar Proyecto"}
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </Dialog.Content>
                    )}
                </AnimatePresence>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default CreateProject;
