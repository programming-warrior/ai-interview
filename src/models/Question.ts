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
    questionId!: number; // Non-null assertion operator

    @Column({ type: 'varchar' })
    question_location!: string; // Non-null assertion operator

    @Column({type:'int'})
    question_no!:number;

    @Column({ type: 'varchar' })
    question_text!: string; // Non-null assertion operator

    @Column({ type: 'varchar', nullable: true, default: null })
    answer_location!: string | null; // Non-null assertion operator

    @Column({ type: 'varchar', nullable: true, default: null })
    answer_text!: string | null; // Non-null assertion operator

    @Column({ type: 'boolean', default: false })
    isAnswerTextAvailable!: boolean; // Non-null assertion operator

    @Column({type:'jsonb',default:null})
    score!:JSON | null;

    @ManyToOne(() => AiInterview, interview => interview.questions)
    @JoinColumn({ name: 'interviewId' })
    interview!: AiInterview; // Non-null assertion operator
}
