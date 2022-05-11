import React from 'react';
import { collection, query } from 'firebase/firestore';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { Row } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';
import TemplateCard from '../../../components/cards/TemplateCard';
import { firestore } from '../../../helpers/Firebase';
import { formatDateInArray } from '../../../helpers/Utils';

const ViewTemplates = () => {
  const { isLoading, data: templates } = useFirestoreQuery(
    ['templates'],
    query(collection(firestore, 'templates')),
    {
      subscribe: true,
    },
    {
      // React Query data selector
      select(snapshot) {
        const templateData = snapshot.docs.map((document) => ({
          ...document.data(),
          id: document.id,
        }));
        return formatDateInArray(templateData);
      },
    }
  );
  if (isLoading) {
    return <div className="loading" />;
  }
  return (
    <Row>
      {templates.length === 0 && (
        <p className="text-center">No templates available!</p>
      )}
      {templates.length > 0 &&
        templates.map((template) => {
          return (
            <Colxx xs="6" sm="4" xl="3" className="mb-4" key={template.id}>
              <TemplateCard template={template} />
            </Colxx>
          );
        })}
    </Row>
  );
};

export default ViewTemplates;
