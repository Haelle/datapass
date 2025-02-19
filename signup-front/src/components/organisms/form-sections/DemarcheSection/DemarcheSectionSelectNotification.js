import React from 'react';
import Loader from '../../../atoms/Loader';
import { get, isEmpty } from 'lodash';
import Alert from '../../../atoms/Alert';
import HighVoltageEmoji from '../../../atoms/icons/HighVoltageEmoji';

const DemarcheSectionNotification = ({
  isLoading = false,
  selectedDemarcheId,
  demarches,
}) => (
  <>
    {isLoading ? (
      <Loader message="pré-remplissage du formulaire en cours ..." />
    ) : (
      <Alert
        title={
          <>
            Formulaire pré-rempli <HighVoltageEmoji />
          </>
        }
      >
        <br />
        Vous avez sélectionné le cas d’usage «{' '}
        <b>
          {get(demarches, selectedDemarcheId, {}).label || selectedDemarcheId}
        </b>
        {' '}
        ».{' '}
        {!isEmpty(demarches) &&
          selectedDemarcheId &&
          get(demarches, selectedDemarcheId, {}).about && (
            <>
              Pour en savoir plus sur ce cas d’usage, vous pouvez en consulter
              la{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Plus d’information sur le cas d’usage « ${selectedDemarcheId} »`}
                href={get(demarches, selectedDemarcheId, {}).about}
              >
                fiche explicative
              </a>
            </>
          )}
        <br />
        <br />
        Certains champs du formulaire ont été pré-remplis afin de faciliter
        votre demande. Attention, il est <b>tout de même indispensable</b> que
        vous lisiez la demande et que vous adaptiez les champs selon votre cas.
      </Alert>
    )}
  </>
);
export default DemarcheSectionNotification;
