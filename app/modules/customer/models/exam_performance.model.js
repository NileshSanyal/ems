var mongoose = require('mongoose');
// const Joi = require('joi');
// Joi.objectId = require('joi-objectid')(Joi);
var Schema = mongoose.Schema;

var examPerformanceSchema = new Schema({
 
  student_id: {type: Schema.Types.ObjectId, ref: 'User', required: true},
   
  exam_details: [
    {
        exam_status: { type: String, default: 'Started', enum: ['Started', 'Finished', 'Pending'] },
        exam_start_time: {type: Date},
        exam_end_time: {type: Date},
        time_spent_by_student: {type: String},
        exam_id: {type: Schema.Types.ObjectId, ref: 'Exam', required: true}
    }
  ],
  question_answer_details: [
      {
        question_id: {type: Schema.Types.ObjectId, ref: 'Question', required: true},
        answer_given: {type: String}
      }
  ],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

var ExamPerformance = mongoose.model('Exam-Performance', examPerformanceSchema);

module.exports.ExamPerformance = ExamPerformance;