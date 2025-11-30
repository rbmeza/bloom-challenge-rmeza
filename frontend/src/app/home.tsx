"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Brand } from "@/types/brand";
import Loading from "./loading";
import styles from "./home.module.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const Home = () => {
  const router = useRouter();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/brands`);

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setBrands(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching brands:", err);
        setError(err instanceof Error ? err.message : "Error al cargar las marcas");
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const handleBrandClick = (brandId: string) => {
    router.push(`/${brandId}`);
  };

  return (
    <div className={styles.homeContainer}>
      <Image
        className={styles.logo}
        src="/images/Logo-Bloom.png"
        alt="Logo"
        width={400}
        height={100}
        priority
      />

      <div className={styles.contentWrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Desafío Dev
          </h1>
          <p className={styles.subtitle}>
            Selecciona las marcas con las que deseas trabajar
          </p>
        </div>

        {loading && (
          <Loading embedded={true} />
        )}

        {error && (
          <div className={styles.errorAlert}>
            <div className={styles.errorContent}>
              <div className={styles.errorIconWrapper}>
                <svg className={styles.errorIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className={styles.errorTextWrapper}>
                <h3 className={styles.errorTitle}>Error al cargar las marcas</h3>
                <p className={styles.errorMessage}>{error}</p>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && brands.length === 0 && (
          <div className={styles.emptyState}>
            <p className={styles.emptyMessage}>No se encontraron marcas disponibles</p>
          </div>
        )}

        {!loading && !error && brands.length > 0 && (
          <div className={styles.brandsGrid}>
            {brands.map((brand) => (
              <div
                key={brand.id}
                onClick={() => handleBrandClick(brand.id)}
                className={styles.brandCard}
              >
                <div className={styles.brandCardContent}>
                  <div className={styles.brandInfo}>
                    <h3 className={styles.brandName}>
                      {brand.name}
                    </h3>
                    <p className={styles.brandUrl}>
                      {brand.url}
                    </p>
                  </div>
                  <div className={styles.brandIconWrapper}>
                    <svg
                      className={styles.brandIcon}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
