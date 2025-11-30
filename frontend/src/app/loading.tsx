import Image from "next/image";

export default function Loading({ embedded = false }: { embedded?: boolean }) {
    const infinityPath = "M 20 50 C 20 10, 70 10, 80 50 S 140 90, 140 50 C 140 10, 90 10, 80 50 S 20 90, 20 50";

    const spinnerContent = (
        <div className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center">
                <svg viewBox="0 0 180 100" className="w-full h-full">
                    <path
                        d={infinityPath}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="15"
                        strokeLinecap="round"
                        className="text-gray-200"
                    />
                    <path
                        d={infinityPath}
                        fill="none"
                        stroke="#1D2244"
                        strokeWidth="15"
                        strokeLinecap="round"
                        className="custom-infinity-stroke"
                    />
                </svg>
            </div>
            <p className="mt-4 text-center" style={{ color: '#1D2244' }}>Cargando...</p>
        </div>
    );

    if (embedded) {
        return (
            <div className="flex w-full flex-1 flex-col items-center justify-center py-12">
                {spinnerContent}
            </div>
        );
    }

    return (
        <div className="flex min-h-screen w-full flex-col p-8 bg-gradient-to-br from-purple-50 via-white to-blue-50">
            <Image
                className="h-14 w-auto self-end mb-8"
                src="/images/Logo-Bloom.png"
                alt="Logo"
                width={400}
                height={100}
                priority
            />
            <div className="flex flex-1 flex-col items-center justify-center">
                {spinnerContent}
            </div>
        </div>
    );
}