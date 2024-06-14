import { loggerToWinstonLogger } from '@backstage/backend-common';
import { mockServices } from '@backstage/backend-test-utils';
import { PassThrough } from 'stream';
import { repourl, token } from '.';
import { JsonValue,JsonObject } from '@backstage/types';
import { BackstageCredentials } from '@backstage/backend-plugin-api';
import { ActionContext } from '@backstage/plugin-scaffolder-node';
import { Logger } from 'winston';
import { coreServices } from '@backstage/backend-plugin-api';

function checkpoint<U extends JsonValue>(key: string,fn: () => Promise<U>): Promise<U>
  {
    return fn();
  }

async function createTemporaryDirectory() : Promise<string>
{
    return "test";
}

async function getInitiatorCredentials(): Promise<BackstageCredentials>
{
    return {
        $$type:   '@backstage/BackstageCredentials',
        principal : ""
    }
}
  
export const mockContext = 
        <TActionInput extends JsonObject, 
        TActionOutput extends JsonObject> 
        (options?: Partial<ActionContext<TActionInput, TActionOutput>>)
                           :ActionContext<TActionInput,TActionOutput> => {

        const winston = require('winston');
        const log = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            transports: [new winston.transports.Console()],
            });                           
        const defaultContext = {
            logger: loggerToWinstonLogger(log),
            logStream: new PassThrough(),
            output: ()=>{},
            createTemporaryDirectory: createTemporaryDirectory,
            input: {} as TActionInput,
            checkpoint: checkpoint,
            getInitiatorCredentials: getInitiatorCredentials,
            };    
        const createDefaultWorkspace = () => ({
                workspacePath: ".",
        });
    
        if (!options) {
        return {
            ...defaultContext,
            ...createDefaultWorkspace(),
        };
        }     
        const { input, logger, logStream, secrets, templateInfo, workspacePath } =  options;
        return {
            ...defaultContext,
            ...(workspacePath ? { workspacePath } : createDefaultWorkspace()),
            ...(workspacePath && {
              createTemporaryDirectory: createTemporaryDirectory,
            }),
            ...(logger && { logger }),
            ...(logStream && { logStream }),
            ...(input && { input }),
            ...(secrets && { secrets }),
            templateInfo,
          };

};
