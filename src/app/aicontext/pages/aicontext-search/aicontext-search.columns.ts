import { ColumnType, DataTableColumn } from '@onecx/angular-accelerator'

export const aIContextSearchColumns: DataTableColumn[] = [{
    id: 'id',
    columnType: ColumnType.STRING,
    nameKey: 'AI_CONTEXT_SEARCH.COLUMNS.ID',
    filterable: true,
    sortable: true,
    predefinedGroupKeys: [
        'AI_CONTEXT_SEARCH.PREDEFINED_GROUP.EXTENDED',
        'AI_CONTEXT_SEARCH.PREDEFINED_GROUP.FULL',
    ],
}, {
    id: 'name',
    columnType: ColumnType.STRING,
    nameKey: 'AI_CONTEXT_SEARCH.COLUMNS.NAME',
    filterable: true,
    sortable: true,
    predefinedGroupKeys: [
        'AI_CONTEXT_SEARCH.PREDEFINED_GROUP.DEFAULT',
        'AI_CONTEXT_SEARCH.PREDEFINED_GROUP.EXTENDED',
        'AI_CONTEXT_SEARCH.PREDEFINED_GROUP.FULL',
    ],
}, {
    id: 'description',
    columnType: ColumnType.STRING,
    nameKey: 'AI_CONTEXT_SEARCH.COLUMNS.DESCRIPTION',
    filterable: true,
    sortable: true,
    predefinedGroupKeys: [
        'AI_CONTEXT_SEARCH.PREDEFINED_GROUP.DEFAULT',
        'AI_CONTEXT_SEARCH.PREDEFINED_GROUP.EXTENDED',
        'AI_CONTEXT_SEARCH.PREDEFINED_GROUP.FULL',
    ],
},

{
    id: 'appId',
    columnType: ColumnType.STRING,
    nameKey: 'AI_CONTEXT_SEARCH.COLUMNS.APP_ID',
    filterable: true,
    sortable: true,
    predefinedGroupKeys: [
        'AI_CONTEXT_SEARCH.PREDEFINED_GROUP.DEFAULT',
        'AI_CONTEXT_SEARCH.PREDEFINED_GROUP.EXTENDED',
        'AI_CONTEXT_SEARCH.PREDEFINED_GROUP.FULL',
    ],
}]
