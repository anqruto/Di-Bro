import { useEffect, useState, type FormEvent } from 'react';
import { CheckCircle2, Mail, MapPin, Phone } from 'lucide-react';
import {
  validateContactForm,
  type ContactFormErrors,
  type ContactFormValues,
} from '../utils/catalogLogic';

import { RevealBlock } from './RevealBlock';

interface ContactSectionProps {
  prefillType?: ContactFormValues['requestType'];
  prefillSubject?: string;
}

const INITIAL_VALUES: ContactFormValues = {
  lastName: '',
  firstName: '',
  company: '',
  email: '',
  phone: '',
  requestType: 'formation',
  subject: '',
  message: '',
  consent: false,
};

export function ContactSection({ prefillType, prefillSubject }: ContactSectionProps) {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submittedRequest, setSubmittedRequest] = useState<ContactFormValues | null>(null);

  useEffect(() => {
    if (prefillType || prefillSubject) {
      setSubmittedRequest(null);
      setValues((prev) => ({
        ...prev,
        requestType: prefillType ?? prev.requestType,
        subject: prefillSubject ?? prev.subject,
      }));
    }
  }, [prefillType, prefillSubject]);

  const handleFieldChange = <K extends keyof ContactFormValues>(
    field: K,
    value: ContactFormValues[K]
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateContactForm(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmittedRequest(values);
    setValues(INITIAL_VALUES);
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left coordinates & commitments */}
          <RevealBlock className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-sm font-semibold text-[#F16D22] mb-2">Contact &amp; Devis</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#12408F] text-balance">
                Construisons votre prochain dispositif
              </h2>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                Un besoin de formation intra-entreprise, une session inter-entreprises ou un
                diagnostic conseil ? Un interlocuteur dédié vous répond sous 24 heures ouvrées.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-[#F16D22] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <div className="text-xs font-medium text-slate-500">Téléphone</div>
                  <a
                    href="tel:0184604210"
                    className="text-base font-semibold text-[#12408F] hover:text-[#F16D22] transition-colors tabular-nums"
                  >
                    01 84 60 42 10
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-[#F16D22] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <div className="text-xs font-medium text-slate-500">E-mail</div>
                  <a
                    href="mailto:contact@didas-brothers.fr"
                    className="text-base font-semibold text-[#12408F] hover:text-[#F16D22] transition-colors"
                  >
                    contact@didas-brothers.fr
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-[#F16D22] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <div className="text-xs font-medium text-slate-500">Siège &amp; Interventions</div>
                  <p className="text-sm text-slate-700">
                    24 Avenue de l’Opéra, 75001 Paris · Interventions sur toute la France
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#F8FAFC] border border-slate-200 space-y-2">
              <h3 className="text-sm font-bold text-[#12408F]">Financement &amp; Qualiopi</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Nos actions de formation sont certifiées Qualiopi et éligibles aux financements
                OPCO selon vos critères de branche. Convention de formation et programme détaillé
                transmis avec chaque devis.
              </p>
            </div>
          </RevealBlock>

          {/* Right validated quote / contact form */}
          <RevealBlock
            delayMs={90}
            className="lg:col-span-7 bg-[#F8FAFC] rounded-2xl p-6 sm:p-9 border border-slate-200"
          >
            {submittedRequest ? (
              <div
                role="status"
                aria-live="polite"
                className="panel-enter bg-white rounded-xl p-8 border border-slate-200 space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#12408F]/10 text-[#12408F] flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-[#F16D22]" />
                </div>
                <h3 className="text-xl font-bold text-[#12408F]">
                  Demande enregistrée avec succès
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Merci{' '}
                  <strong>
                    {submittedRequest.firstName} {submittedRequest.lastName}
                  </strong>{' '}
                  ({submittedRequest.company}). Votre demande concernant{' '}
                  <strong>{submittedRequest.subject || submittedRequest.requestType}</strong> a
                  bien été transmise à notre équipe pédagogique. Un conseiller vous recontactera à
                  l’adresse <strong>{submittedRequest.email}</strong> sous 24 heures ouvrées.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmittedRequest(null)}
                  className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-[#12408F] hover:bg-[#12408F]/90 rounded-lg transition-colors cursor-pointer"
                >
                  Envoyer une nouvelle demande
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-lastname"
                      className="block text-xs font-semibold text-[#12408F] mb-1.5"
                    >
                      Nom *
                    </label>
                    <input
                      id="contact-lastname"
                      type="text"
                      value={values.lastName}
                      onChange={(e) => handleFieldChange('lastName', e.target.value)}
                      placeholder="Martin"
                      className={`w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border ${
                        errors.lastName ? 'border-red-600' : 'border-slate-300'
                      } focus:outline-none focus:border-[#12408F]`}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-xs text-red-700">{errors.lastName}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-firstname"
                      className="block text-xs font-semibold text-[#12408F] mb-1.5"
                    >
                      Prénom *
                    </label>
                    <input
                      id="contact-firstname"
                      type="text"
                      value={values.firstName}
                      onChange={(e) => handleFieldChange('firstName', e.target.value)}
                      placeholder="Camille"
                      className={`w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border ${
                        errors.firstName ? 'border-red-600' : 'border-slate-300'
                      } focus:outline-none focus:border-[#12408F]`}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-xs text-red-700">{errors.firstName}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-company"
                      className="block text-xs font-semibold text-[#12408F] mb-1.5"
                    >
                      Entreprise / Organisme *
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      value={values.company}
                      onChange={(e) => handleFieldChange('company', e.target.value)}
                      placeholder="Nom de votre structure"
                      className={`w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border ${
                        errors.company ? 'border-red-600' : 'border-slate-300'
                      } focus:outline-none focus:border-[#12408F]`}
                    />
                    {errors.company && (
                      <p className="mt-1 text-xs text-red-700">{errors.company}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs font-semibold text-[#12408F] mb-1.5"
                    >
                      Téléphone *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={values.phone}
                      onChange={(e) => handleFieldChange('phone', e.target.value)}
                      placeholder="06 12 34 56 78"
                      className={`w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border ${
                        errors.phone ? 'border-red-600' : 'border-slate-300'
                      } focus:outline-none focus:border-[#12408F]`}
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-700">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-[#12408F] mb-1.5"
                    >
                      E-mail professionnel *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={values.email}
                      onChange={(e) => handleFieldChange('email', e.target.value)}
                      placeholder="camille.martin@entreprise.fr"
                      className={`w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border ${
                        errors.email ? 'border-red-600' : 'border-slate-300'
                      } focus:outline-none focus:border-[#12408F]`}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-700">{errors.email}</p>}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-type"
                      className="block text-xs font-semibold text-[#12408F] mb-1.5"
                    >
                      Type de demande
                    </label>
                    <select
                      id="contact-type"
                      value={values.requestType}
                      onChange={(e) =>
                        handleFieldChange(
                          'requestType',
                          e.target.value as ContactFormValues['requestType']
                        )
                      }
                      className="w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border border-slate-300 focus:outline-none focus:border-[#12408F] cursor-pointer"
                    >
                      <option value="formation">Inscription / Devis Formation</option>
                      <option value="conseil">Mission Conseil &amp; Diagnostic</option>
                      <option value="sur-mesure">Parcours Intra sur mesure</option>
                      <option value="accessibilite">Accessibilité &amp; Référent Handicap</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-semibold text-[#12408F] mb-1.5"
                  >
                    Formation ou thématique concernée
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={values.subject}
                    onChange={(e) => handleFieldChange('subject', e.target.value)}
                    placeholder="Ex. : Formation Initiale CSE, SST, Audit DUERP..."
                    className="w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border border-slate-300 focus:outline-none focus:border-[#12408F]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-[#12408F] mb-1.5"
                  >
                    Précisez votre besoin (effectif, lieu, délais souhaités) *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={values.message}
                    onChange={(e) => handleFieldChange('message', e.target.value)}
                    placeholder="Décrivez votre contexte et le nombre de participants envisagé..."
                    className={`w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border ${
                      errors.message ? 'border-red-600' : 'border-slate-300'
                    } focus:outline-none focus:border-[#12408F]`}
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-700">{errors.message}</p>}
                </div>

                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={values.consent}
                      onChange={(e) => handleFieldChange('consent', e.target.checked)}
                      className="mt-1 w-4 h-4 accent-[#12408F] rounded cursor-pointer"
                    />
                    <span className="text-xs text-slate-600 leading-relaxed">
                      J’accepte d’être recontacté(e) par le cabinet DIDAS &amp; BROTHERS dans le
                      cadre de cette demande de devis ou d’information. *
                    </span>
                  </label>
                  {errors.consent && <p className="mt-1 text-xs text-red-700">{errors.consent}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-white bg-[#F16D22] hover:bg-[#D95B16] rounded-lg transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#12408F]"
                >
                  Envoyer ma demande de devis
                </button>
              </form>
            )}
          </RevealBlock>
        </div>
      </div>
    </section>
  );
}
