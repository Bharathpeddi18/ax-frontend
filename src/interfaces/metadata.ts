interface I_MetadataClass {
    id: string
    uid: string
    title: string
    sections: string
    is_archived: string
    modified_by: string
    modified_date: string
}

export type I_MetadataClassList = I_MetadataClass[]

interface I_MetadataSection {
    id: string
    uid: string
    title: string
    sections: string
    is_archived: string
    modified_by: string
    modified_date: string
}

export type I_MetadataSectionList = I_MetadataSection[]