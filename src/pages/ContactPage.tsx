import { type ContactFormValues, type PageRoute } from '../utils/catalogLogic';
import { PageBanner } from '../components/PageBanner';
import { ContactSection } from '../components/ContactSection';

interface ContactPageProps {
  prefillType?: ContactFormValues['requestType'];
  prefillSubject?: string;
  onNavigateRoute: (route: PageRoute) => void;
}

export function ContactPage({
  prefillType,
  prefillSubject,
  onNavigateRoute,
}: ContactPageProps) {
  return (
    <div>
      <PageBanner
        breadcrumbLabel="Contact"
        kicker="Devis, intra-entreprise & renseignement"
        title="Contactez DIDAS & BROTHERS"
        description="Échangez avec un consultant-formateur pour concevoir votre programme de formation certifié Qualiopi, organiser une session intra-entreprise ou planifier un diagnostic conseil sur site."
        onNavigateHome={onNavigateRoute}
      />

      <ContactSection prefillType={prefillType} prefillSubject={prefillSubject} />
    </div>
  );
}
