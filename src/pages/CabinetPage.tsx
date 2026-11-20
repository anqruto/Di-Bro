import { SITE_IMAGES } from '../data/catalog';
import { type PageRoute } from '../utils/catalogLogic';
import { PageBanner } from '../components/PageBanner';
import { CabinetAndAccreditations } from '../components/CabinetAndAccreditations';
import { TestimonialsSection } from '../components/TestimonialsSection';

interface CabinetPageProps {
  onNavigateRoute: (route: PageRoute) => void;
  onContactAccessibility: () => void;
}

export function CabinetPage({
  onNavigateRoute,
  onContactAccessibility,
}: CabinetPageProps) {
  return (
    <div>
      <PageBanner
        breadcrumbLabel="Le cabinet"
        kicker="Notre identité · Agréments officiels · Équipe"
        title="Le cabinet DIDAS & BROTHERS"
        description="Découvrez l’équipe de consultants IPRP, psychologues du travail et formateurs certifiés qui accompagnent nos clients partout en France sous certification Qualiopi et agréments INRS, DREETS et CARSAT."
        image={SITE_IMAGES.equipe}
        imageAlt="L'équipe de direction et consultants DIDAS & BROTHERS"
        imageObjectPosition="object-left scale-[1.22] origin-left"
        onNavigateHome={onNavigateRoute}
      />

      <CabinetAndAccreditations onContactAccessibility={onContactAccessibility} />

      <TestimonialsSection />
    </div>
  );
}
