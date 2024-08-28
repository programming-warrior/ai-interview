import {
    Entity,
    PrimaryColumn,
    Column,
    OneToMany
} from 'typeorm';
import { Question } from './Question';

@Entity('aiInterview')
export class AiInterview {
    @PrimaryColumn({ type: 'varchar' })
    interviewId!: string; 

    @Column({ type: 'varchar' })
    jobId!: string; 

    @Column({ type: 'varchar' })
    userId!: string; 

    @Column({ type: 'int' })
    totalQuestion!: number; 

    @Column({ type: 'timestamp' })
    scheduled_at!: Date; 

    @Column({ type: 'int', default: 1 })
    currentQuestion!: number; 

    @Column({type:'boolean',default:false})
    started!:Boolean

    @Column({type:'boolean',default:false})
    completed!:Boolean

    @Column({ type: 'jsonb' })
    violations!: any; 

    @OneToMany(() => Question, question => question.interview)
    questions!: Question[]; 
}
