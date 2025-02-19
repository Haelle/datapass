import React from 'react';
import Form from '../../components/templates/Form';
import DescriptionSection from '../../components/organisms/form-sections/DescriptionSection';
import OrganisationSection from '../../components/organisms/form-sections/OrganisationSection';
import DemarcheSection from '../../components/organisms/form-sections/DemarcheSection';
import CguSection from '../../components/organisms/form-sections/CguSection';
import ÉquipeSection from '../../components/organisms/form-sections/ÉquipeSection';
import CadreJuridiqueSection from '../../components/organisms/form-sections/CadreJuridiqueSection';
import { additionalTermsOfUse } from './common';
import {
  demarches,
  availableScopes,
  DonneesDescription,
} from './api-impot-particulier-common';
import DonneesSection from '../../components/organisms/form-sections/DonneesSection';
import { DATA_PROVIDER_CONTACT_EMAILS } from '../../config/data-provider-parameters';
import PreviousEnrollmentSection from '../../components/organisms/form-sections/PreviousEnrollmentSection';

export const CadreJuridiqueDescription = () => (
  <>
    <p>
      Pour pouvoir bénéficier du raccordement à l’API Impôt particulier, le
      cadre légal et réglementaire des fournisseurs de service doit permettre à
      la DGFiP de transmettre des données fiscales à votre entité
      administrative.
    </p>
    <p>
      Conformément au Code des relations entre le public et l’administration,
      l’échange de données s’impose aux administrations dès lors que :
    </p>
    <ul>
      <li>
        ces données sont nécessaires au traitement d’une demande présentée par
        un usager ;
      </li>
      <li>
        l’administration destinataire est habilitée à connaître ces données dans
        le cadre de ses missions. (Article L114-8 1er alinéa modifié par LOI
        n°2016-1321 du 7 octobre 2016 - art. 91 )
      </li>
    </ul>
  </>
);

const target_api = 'api_impot_particulier_fc_sandbox';
const steps = [
  'franceconnect',
  target_api,
  'api_impot_particulier_fc_production',
];

const ApiImpotParticulierFcSandbox = ({
  match: {
    params: { enrollmentId },
  },
}) => (
  <Form
    enrollmentId={enrollmentId}
    target_api={target_api}
    demarches={demarches}
    contactEmail={DATA_PROVIDER_CONTACT_EMAILS.dgfip}
    documentationUrl="https://api.gouv.fr/les-api/impot-particulier"
  >
    <PreviousEnrollmentSection steps={steps} />
    <OrganisationSection />
    <DemarcheSection availableScopes={availableScopes} />
    <DescriptionSection />
    <DonneesSection
      DonneesDescription={DonneesDescription}
      availableScopes={availableScopes}
      enableFileSubmissionForScopeSelection={true}
    />
    <CadreJuridiqueSection
      CadreJuridiqueDescription={CadreJuridiqueDescription}
    />
    <ÉquipeSection />
    <CguSection
      cguLink="/docs/cgu_api_impot_particulier_bac_a_sable_connexion_fc_septembre2020_v2.6.pdf"
      additionalTermsOfUse={additionalTermsOfUse}
    />
  </Form>
);

export default ApiImpotParticulierFcSandbox;
