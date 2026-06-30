type DividerVariant = 'light' | 'dark' | 'to-dark' | 'to-light';

interface SectionDividerProps {
  variant?: DividerVariant;
}

const SectionDivider = ({ variant = 'light' }: SectionDividerProps) => {
  if (variant === 'to-dark' || variant === 'to-light') {
    return <div className={`section-divider section-divider--${variant}`} aria-hidden />;
  }

  return (
    <div className={`section-divider section-divider--${variant}`} aria-hidden>
      <div className="section-divider-rule">
        <span className="section-divider-gem" />
      </div>
    </div>
  );
};

export default SectionDivider;
