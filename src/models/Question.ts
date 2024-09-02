import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { AiInterview } from './AiInterview';

@Entity('question')
export class Question {
    @PrimaryGeneratedColumn()
    questionId!: number; 

    @Column({ type: 'varchar' })
    question_location!: string; 

    @Column({type:'int'})
    question_no!:number;

    @Column({ type: 'varchar' })
    question_text!: string; 

    @Column({ type: 'varchar', nullable: true, default: null })
    answer_location!: string | null; 

    @Column({ type: 'varchar', nullable: true, default: null })
    answer_text!: string | null; 

    @Column({ type: 'boolean', default: false })
    isAnswerTextAvailable!: boolean; 

    @Column({type:'jsonb',default:null})
    score!:JSON | null;

    @ManyToOne(() => AiInterview, interview => interview.questions)
    @JoinColumn({ name: 'interviewId' })
    interview!: AiInterview; 
}
