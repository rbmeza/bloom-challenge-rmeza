import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
    title?: string;
    message: string;
}

export default function ErrorMessage({ title = "Error", message }: ErrorMessageProps) {
    return (
        <div className={styles.errorAlert}>
            <div className={styles.errorContent}>
                <div className={styles.errorIconWrapper}>
                    <svg className={styles.errorIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div className={styles.errorTextWrapper}>
                    <h3 className={styles.errorTitle}>{title}</h3>
                    <p className={styles.errorMessage}>{message}</p>
                </div>
            </div>
        </div>
    );
}
