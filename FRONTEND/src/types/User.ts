export interface UserInterface {
    id: string,
    name: string,
    email: string,
    cep: string,
    adm: boolean
}

export type userContextType = {
    user: UserInterface | null | undefined,
    setUser: React.Dispatch<React.SetStateAction<undefined>>
}