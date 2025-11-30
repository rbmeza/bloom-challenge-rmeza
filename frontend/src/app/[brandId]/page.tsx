"use client";

import Image from "next/image";
import { JSX, use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Brand, BrandSettings } from "@/types/brand";
import Loading from "../loading";
import styles from "./page.module.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function BrandDetailPage({ params }: { params: Promise<{ brandId: string }> }) {
    const router = useRouter();
    const resolvedParams = use(params);
    const brandId = resolvedParams.brandId;
    const [brand, setBrand] = useState<Brand | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBrand = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_URL}/brands/${brandId}`);

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setBrand(data);
                setError(null);
            } catch (err) {
                console.error("Error fetching brand:", err);
                setError(err instanceof Error ? err.message : "Error al cargar la marca");
            } finally {
                setLoading(false);
            }
        };

        fetchBrand();
    }, [brandId]);

    if (loading) {
        return (
            <div className={styles.pageContainer}>
                <Image
                    className={styles.logo}
                    src="/images/Logo-Bloom.png"
                    alt="Logo"
                    width={400}
                    height={100}
                    priority
                />
                <Loading embedded={true} />
            </div>
        );
    }

    if (error || !brand) {
        return (
            <div className={styles.pageContainer}>
                <Image
                    className={styles.logo}
                    src="/images/Logo-Bloom.png"
                    alt="Logo"
                    width={400}
                    height={100}
                    priority
                />
                <div className={styles.contentWrapper}>
                    <div className={styles.errorAlert}>
                        <div className={styles.errorContent}>
                            <div className={styles.errorIconWrapper}>
                                <svg className={styles.errorIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className={styles.errorTextWrapper}>
                                <h3 className={styles.errorTitle}>Error al cargar la marca</h3>
                                <p className={styles.errorMessage}>{error || "Marca no encontrada"}</p>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => router.push("/")}
                        className={styles.returnButton}
                    >
                        ← Volver al inicio
                    </button>
                </div>
            </div>
        );
    }

    const settings = brand.settings;

    return (
        <div className={styles.pageContainer}>
            <Image
                className={styles.logo}
                src="/images/Logo-Bloom.png"
                alt="Logo"
                width={400}
                height={100}
                priority
            />

            <div className={styles.contentWrapper}>
                {/* Back Button */}
                <button
                    onClick={() => router.push("/")}
                    className={styles.backButton}
                >
                    <svg className={styles.backButtonIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Volver al inicio
                </button>

                {/* Brand Header */}
                <div className={styles.brandHeader}>
                    <h1 className={styles.brandTitle}>
                        {brand.name}
                    </h1>
                    <a
                        href={brand.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.brandLink}
                    >
                        {brand.url}
                        <svg className={styles.brandLinkIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>

                {/* FAQ Section */}
                {settings && (
                    <div className={styles.faqSection}>
                        <h2 className={styles.faqTitle}>
                            <svg className={styles.faqTitleIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Preguntas Frecuentes
                        </h2>

                        <div className={styles.faqList}>
                            <FAQItem
                                question="¿Cómo puedo publicar un producto para la venta?"
                                answer={getPublishProductAnswer()}
                            />

                            <FAQItem
                                question="¿Cómo envío mi artículo después de que alguien lo compra?"
                                answer={getShippingAnswer(settings)}
                            />

                            <FAQItem
                                question="¿Cómo y cuándo recibo el pago?"
                                answer={getPaymentAnswer(settings)}
                            />

                            <FAQItem
                                question="¿Hay cobros adicionales por vender mi producto por acá?"
                                answer={getAdditionalChargesAnswer(settings)}
                            />

                            {settings.coupon && (
                                <FAQItem
                                    question="Política de uso de cupones"
                                    answer={getCouponPolicyAnswer(brand)}
                                />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// Helper component for FAQ items
function FAQItem({ question, answer }: { question: string; answer: JSX.Element }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.faqItem}>
            <button
                className={styles.faqQuestion}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <svg
                    className={`${styles.faqQuestionIcon} ${isOpen ? styles.faqQuestionIconOpen : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {question}
            </button>
            {isOpen && (
                <div className={styles.faqAnswer}>
                    {answer}
                </div>
            )}
        </div>
    );
}

// Helper functions to generate answers based on settings
function getPublishProductAnswer(): JSX.Element {
    return (
        <>
            <p>
                ¡Publicar tu producto es muy fácil! Simplemente haz clic en <span className={styles.faqHighlight}>"Vender"</span>,
                crea una cuenta y sigue el proceso de publicación.
            </p>
            <p>
                Una vez que completes el formulario de venta, la publicación será revisada por nuestro equipo y en un
                plazo máximo de <strong>24 horas</strong>, te avisaremos si está aprobada o rechazada.
            </p>
            <p>
                Después de ser revisada y aprobada, se hará pública. Si hay algún problema, recibirás un correo electrónico
                pidiendo hacer cambios antes de que pueda ser aceptada.
            </p>
            <div className={styles.faqNote}>
                ⏱️ El proceso de revisión toma máximo 24 horas. ¡Mantente atento a tu correo electrónico!
            </div>
        </>
    );
}

function getShippingAnswer(settings: BrandSettings): JSX.Element {
    const options = [];
    if (settings.homePickup) options.push("Retiro a domicilio");
    if (settings.blueExpress) options.push("Blue Express");

    if (options.length === 0) {
        return (
            <p>
                Actualmente no hay opciones de envío configuradas para esta marca.
                Por favor, contacta al soporte para más información.
            </p>
        );
    }

    return (
        <>
            <p>Tienes las siguientes opciones disponibles para enviar tu artículo:</p>
            <ul>
                {settings.homePickup && (
                    <li>
                        <span className={styles.faqHighlight}>Retiro a domicilio:</span> El comprador puede coordinar
                        contigo para retirar el artículo directamente en tu domicilio.
                    </li>
                )}
                {settings.blueExpress && (
                    <li>
                        <span className={styles.faqHighlight}>Blue Express:</span> Puedes enviar el artículo a través
                        de Blue Express. Los costos de envío serán coordinados con el comprador.
                    </li>
                )}
            </ul>
        </>
    );
}

function getPaymentAnswer(settings: BrandSettings): JSX.Element {
    const options = [];
    if (settings.coupon) options.push("cupones (100% del valor)");
    if (settings.wireTransfer) options.push("transferencia bancaria (80% del valor)");

    if (options.length === 0) {
        return (
            <p>
                Actualmente no hay métodos de pago configurados para esta marca.
                Por favor, contacta al soporte para más información.
            </p>
        );
    }

    return (
        <>
            <p>El pago se procesa a través de los siguientes métodos:</p>
            <ul>
                {settings.coupon && (
                    <li>
                        <span className={styles.faqHighlight}>Cupones:</span> Recibirás el <strong>100% del valor</strong> de
                        la venta cuando el comprador utilice cupones como método de pago.
                    </li>
                )}
                {settings.wireTransfer && (
                    <li>
                        <span className={styles.faqHighlight}>Transferencia bancaria:</span> Recibirás el <strong>80% del valor</strong> de
                        la venta cuando el comprador pague mediante transferencia bancaria. El 20% restante corresponde a comisiones de la plataforma.
                    </li>
                )}
            </ul>
            <div className={styles.faqNote}>
                💡 Los pagos se procesan dentro de 24-48 horas después de confirmada la venta.
            </div>
        </>
    );
}

function getAdditionalChargesAnswer(settings: BrandSettings): JSX.Element {
    if (settings.additionalCharges) {
        return (
            <>
                <p>{settings.additionalCharges}</p>
                <div className={styles.faqNote}>
                    ℹ️ Esta información es específica para {settings.brandId}. Asegúrate de leerla cuidadosamente.
                </div>
            </>
        );
    }

    return (
        <p>
            No hay cobros adicionales especificados para esta marca. Las únicas deducciones son las comisiones
            estándar según el método de pago seleccionado por el comprador.
        </p>
    );
}

function getCouponPolicyAnswer(brand: Brand): JSX.Element {
    return (
        <>
            <p>
                Los cupones que recibas por la venta de tus productos tienen las siguientes restricciones:
            </p>
            <ul>
                <li>Se pueden utilizar únicamente para compras en el sitio web <a href={brand.url} target="_blank"
                    className="underline font-bold">{brand.name}</a>.</li>
                <li>Tiene un tiempo máximo para ser utilizado de 6 meses.</li>
                <li>Está restringido a un monto mínimo de pedido para que pueda utilizarse en el ecommerce. El monto mínimo está definido por el monto del cupón + $1.000 CLP.</li>
            </ul>
            <div className={styles.faqNote}>
                ✨ Los cupones son la forma más beneficiosa de recibir pagos, ya que no hay comisiones adicionales.
            </div>
        </>
    );
}
