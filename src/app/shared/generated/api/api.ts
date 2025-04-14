export * from './aIContextBffService.service';
import { AIContextBffService } from './aIContextBffService.service';
export * from './aIKnowledgeDocumentBffService.service';
import { AIKnowledgeDocumentBffService } from './aIKnowledgeDocumentBffService.service';
export * from './aIKnowledgeVectorDbBffService.service';
import { AIKnowledgeVectorDbBffService } from './aIKnowledgeVectorDbBffService.service';
export const APIS = [AIContextBffService, AIKnowledgeDocumentBffService, AIKnowledgeVectorDbBffService];
