import { MigrationInterface, QueryRunner } from "typeorm";

export class Schema1725019464818 implements MigrationInterface {
    name = 'Schema1725019464818'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "question" ("questionId" SERIAL NOT NULL, "question_location" character varying NOT NULL, "question_no" integer NOT NULL, "question_text" character varying NOT NULL, "answer_location" character varying, "answer_text" character varying, "isAnswerTextAvailable" boolean NOT NULL DEFAULT false, "score" jsonb, "interviewId" character varying, CONSTRAINT "PK_f5c864430d1f3626bc6671d6b8d" PRIMARY KEY ("questionId"))`);
        await queryRunner.query(`CREATE TABLE "aiInterview" ("interviewId" character varying NOT NULL, "jobId" character varying NOT NULL, "userId" character varying NOT NULL, "totalQuestion" integer NOT NULL, "scheduled_at" TIMESTAMP NOT NULL, "currentQuestion" integer NOT NULL DEFAULT '1', "started" boolean NOT NULL DEFAULT false, "completed" boolean NOT NULL DEFAULT false, "violations" jsonb NOT NULL, CONSTRAINT "PK_7e4ad3f5158af854c106dd28a66" PRIMARY KEY ("interviewId"))`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_a2bf0d5542046e44f22d4ac808e" FOREIGN KEY ("interviewId") REFERENCES "aiInterview"("interviewId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_a2bf0d5542046e44f22d4ac808e"`);
        await queryRunner.query(`DROP TABLE "aiInterview"`);
        await queryRunner.query(`DROP TABLE "question"`);
    }

}
