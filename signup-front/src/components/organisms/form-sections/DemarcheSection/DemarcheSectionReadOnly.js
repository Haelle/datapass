import React, { useContext, useEffect, useState } from 'react';
import { get, has, isEmpty, find, merge } from 'lodash';
import { FormContext } from '../../../templates/Form';
import { ScrollablePanel } from '../../Scrollable';
import { UserContext } from '../../UserContext';
import { findModifiedFields, findModifiedScopes } from '../../../../lib';
import './DemarcheSectionReadOnly.css';
import WarningEmoji from '../../../atoms/icons/WarningEmoji';

const valueToLabel = (key, availableScopes) => {
  const scope = find(availableScopes, { value: key });
  if (scope) {
    return scope.label;
  } else {
    return key;
  }
};

export const DemarcheSectionReadOnly = ({ scrollableId, availableScopes }) => {
  const { enrollment, demarches } = useContext(FormContext);

  const { demarche: selectedDemarcheId } = enrollment;
  const {
    user: { roles },
  } = useContext(UserContext);

  const [modifiedFields, setModifiedFields] = useState([]);
  const [modifiedScopes, setModifiedScopes] = useState({});

  useEffect(() => {
    if (
      demarches[selectedDemarcheId] &&
      demarches[selectedDemarcheId].state &&
      enrollment
    ) {
      const demarcheState = merge(
        {},
        get(demarches, 'default', {}).state,
        get(demarches, selectedDemarcheId, {}).state
      );
      setModifiedFields(findModifiedFields(demarcheState, enrollment));
      setModifiedScopes(findModifiedScopes(demarcheState, enrollment));
    }
  }, [enrollment, selectedDemarcheId, demarches]);

  const hasSelectedDemarche =
    has(demarches, selectedDemarcheId) && selectedDemarcheId !== 'default';

  return (
    <>
      <ScrollablePanel scrollableId={scrollableId}>
        <h2>Les modèles pré-remplis</h2>
        <div>
          {hasSelectedDemarche ? (
            <>
              <p>
                Ce formulaire a été pré-rempli selon le cas d’usage suivant :{' '}
                <i>
                  {get(demarches, selectedDemarcheId, {}).label ||
                    selectedDemarcheId}
                </i>
              </p>
              {!isEmpty(roles) && !isEmpty(modifiedFields) && (
                <p>
                  Certaines des sections pré-remplies par le cas d’usage ont été
                  modifiées.
                </p>
              )}
              {!isEmpty(modifiedScopes) && (
                <>
                  <p>
                    Les périmètres de données suivants ont notamment été
                    modifiés par rapport au modèle pré-rempli :
                  </p>
                  <ul>
                    {Object.entries(modifiedScopes).map(([key, value]) => (
                      <li key={key}>
                        <strong>{valueToLabel(key, availableScopes)} :</strong>
                        {value ? (
                          <span className="text--red">
                            {' '}
                            <WarningEmoji /> Nouvelle donnée demandée
                          </span>
                        ) : (
                          <span className="text--green"> Donnée décochée</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </>
          ) : (
            <>Cette demande n’a pas utilisé de modèle de pré-remplissage.</>
          )}
        </div>
      </ScrollablePanel>
    </>
  );
};

export default DemarcheSectionReadOnly;
