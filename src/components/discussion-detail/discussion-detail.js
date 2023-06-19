import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';
import { Card } from 'primereact/card';

const DiscussionDetail = ({ discussion, onGoBack }) => {
   const [answers, setAnswers] = useState([]);
   const [answer, setAnswer] = useState('');
   const [comment, setComment] = useState([]);

   const handleAnswerSubmit = () => {
      const newAnswer = {
         answer,
         comments: [],
      };
      setAnswers([...answers, newAnswer]);
      setAnswer('');
      setComment([...comment, '']);
   };

   const handleCommentSubmit = (answerIndex, commentValue) => {
      const updatedAnswers = [...answers];
      updatedAnswers[answerIndex].comments.push(commentValue);
      setAnswers(updatedAnswers);

      const updatedComments = [...comment];
      updatedComments[answerIndex] = '';
      setComment(updatedComments);
   };

   const renderAnswers = () => {
      return answers.map((answer, index) => (
         <Card key={index} className=''>
            <div className='card-container'>
               <Avatar
                  image='https://picsum.photos/200'
                  shape='circle'
                  size='large'
                  className='p-mr-2 '
               />
               <div className='inline-block p-2'>
                  <h3 className=''>User Name</h3>
               </div>
               <h4 className=''>Answer: {answer.answer}</h4>
            </div>
            <div className=''>
               {answer.comments.map((comment, commentIndex) => (
                  <div key={commentIndex} className='card-container'>
                     <Avatar
                        image='https://picsum.photos/200'
                        shape='circle'
                        size='medium'
                        className='p-mr-2'
                     />
                     <div>
                        <p className='inline-block p-2'>{comment}</p>
                        <Badge value='Like' className='p-mt-2' />
                     </div>
                  </div>
               ))}
            </div>
            <div className='p-card-footer'>
               <div className='p-inputgroup'>
                  <Avatar
                     image='https://picsum.photos/200'
                     shape='circle'
                     size='medium'
                     className='p-mr-2'
                  />
                  <InputTextarea
                     onChange={(e) => {
                        const updatedComments = [...comment];
                        updatedComments[index] = e.target.value;
                        setComment(updatedComments);
                     }}
                     value={comment[index]}
                     className='p-inputtext-filled'
                     placeholder='Write a comment...'
                     autoResize
                  />
                  <Button
                     label='Comment'
                     onClick={() => handleCommentSubmit(index, comment[index])}
                     className='p-button-secondary'
                  />
               </div>
            </div>
         </Card>
      ));
   };

   return (
      <div className=''>
         <div className='p-d-flex p-justify-between p-mb-4'>
            <h3>{discussion.discussionTopic}</h3>
            <Button
               label='Go Back'
               onClick={onGoBack}
               className='p-button-primary'
            />
         </div>
         <div className='p-mb-4'>
            <p>{discussion.discussionContent}</p>
         </div>
         <div className='p-mb-4'>
            <h4>Answers:</h4>
            {renderAnswers()}
         </div>
         <Card className='p-shadow-2 p-mb-4'>
            <div className='p-d-flex p-ai-start p-p-3'>
               <Avatar
                  image='https://picsum.photos/200'
                  shape='circle'
                  size='large'
                  className='p-mr-2'
               />
               <div>
                  <InputTextarea
                     onChange={(e) => setAnswer(e.target.value)}
                     value={answer}
                     className='p-inputtext-filled p-mb-3'
                     placeholder='Write your answer...'
                     rows={4}
                     autoResize
                  />
                  <Button
                     label='Submit Answer'
                     onClick={handleAnswerSubmit}
                     className='p-button-secondary'
                  />
               </div>
            </div>
         </Card>
      </div>
   );
};

DiscussionDetail.propTypes = {
   discussion: PropTypes.object.isRequired,
   onGoBack: PropTypes.func.isRequired,
};

export default DiscussionDetail;
