import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'primereact/button';
import '../../styles/discussion-detail.scss';

const DiscussionDetail = ({ discussion, onGoBack }) => (
   <div className='p-d-flex p-flex-column '>
      <div className='p-d-flex p-flex-column p-mt-4'>
         <div className='p-d-flex p-flex-column'>
            <h3 className='p-text-bold'>{discussion.discussionTopic}</h3>
            <h4>{discussion.discussionContent}</h4>
         </div>
      </div>
      <div className='button-container'>
         <Button
            label='Go Back'
            onClick={onGoBack}
            className='p-button-secondary'
         />
      </div>
   </div>
);

DiscussionDetail.propTypes = {
   discussion: PropTypes.object.isRequired,
   onGoBack: PropTypes.func.isRequired,
};

DiscussionDetail.defaultProps = {};

export default DiscussionDetail;
