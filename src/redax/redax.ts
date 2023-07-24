import {v1} from "uuid";

export const portfolioArray: PortfolioArrayType = {
    navList: {
        navTitle: "Мои работы",
        navButton: [
            {id: v1(), title: "Главная"},
            {id: v1(), title: "Скилы"},
            {id: v1(), title: "Работы"},
            {id: v1(), title: "Контакты"}
        ]
    },
    mySkills: {
        mySkillsTitle: "Мои скиллы",
        mySkillsArray: [
            {
                id: v1(),
                title: "HTML",
                skillDescription: "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla "
            },
            {id: v1(), title: "CSS", skillDescription: "bla bla bla"},
            {id: v1(), title: "JS", skillDescription: "bla bla bla"}
        ]
    },
    myWorks: {
        title: "Мои работы",
        myWork: [
            {
                id: v1(),
                myWorkPhoto: {url: 'we'},
                myWorksButton: "Смотреть",
                myWorkDescription: {id: v1(), projectName: "bla bla bla", shortDescription: "bla bla bla"}
            },
            {
                id: v1(),
                myWorkPhoto: {url: 'sfdf'},
                myWorksButton: "Смотреть",
                myWorkDescription: {id: v1(), projectName: "bla bla bla", shortDescription: "bla bla bla"}
            },
        ]
    },
    hireMe: {
        hiringTitle: "Рассматриваю варианты удаленной работы",
        hiringButton: "Нанять меня"
    },
    contacts: {
        contactsArray: [
            {id: v1(), inputValue: ""},
            {id: v1(),  inputValue: ""},
        ],
        contactsTextArea:'',
        contactsTitle: "Контакты",
        contactsButton: "Отправить"
    },
    footer:{
        titleFooter: "Anton Shaga",
        footer: "Все права защищены"
    }

}
export type PortfolioArrayType = {
    navList: NavListType
    mySkills: MySkillsType
    myWorks: MyWorksType
    hireMe: HireMeType
    contacts: ContactsType
    footer:FooterType
}

export type NavListType = {
    navTitle: string
    navButton: Array<NavButtonType>
}
export type NavButtonType = {
    title: string
    id: string
}
export type MySkillsType = {
    mySkillsTitle: string
    mySkillsArray: Array<MySkillsArrayType>
}
export type MySkillsArrayType = {
    id: string
    title: string
    skillDescription: string
}
export type MyWorksType = {
    title: string
    myWork: Array<MyWorkType>

}
export type MyWorkType = {
    id: string
    myWorksButton: string
    myWorkPhoto: MyWorkPhotoType
    myWorkDescription: MyWorkDescriptionType
}
export type MyWorkDescriptionType = {
    id: string
    projectName: string
    shortDescription: string

}
export type MyWorkPhotoType = {
    url: string
}
export type HireMeType = {
    hiringTitle: string
    hiringButton: string
}
export type ContactsType = {
    contactsArray: Array<ContactsArrayType>
    contactsTextArea:string
    contactsTitle: string
    contactsButton: string
}
export type ContactsArrayType = {
    id: string
    inputValue: string
}
export type FooterType = {
    titleFooter:string
    footer:string
}
export type ActionType =
    OnChangeInputValueType | OnChangeTextAreaValueType

type OnChangeInputValueType = {
    type: 'ON-CANGE-INPUT-VALUE'
    value: string
    id: string
}
type OnChangeTextAreaValueType = {
    type: 'ON-CANGE-TEXT-AREA-VALUE'
    value: string
}
export const portfolioReducer = (state: PortfolioArrayType = portfolioArray, action: ActionType): PortfolioArrayType => {
    let newState = {...state}
    switch (action.type) {
        case 'ON-CANGE-INPUT-VALUE': {
            newState.contacts.contactsArray.map(el => el.id === action.id ? el.inputValue = action.value : '')
            return newState
        }
        case 'ON-CANGE-TEXT-AREA-VALUE': {
            newState.contacts.contactsTextArea = action.value
            return newState
        }
    }
    return state
}

export const onChangeInputValueAC = (value: string, id: string):OnChangeInputValueType => {
    return {type: 'ON-CANGE-INPUT-VALUE', value, id}
}
export const onChangeTextAreaValueAC = (value: string):OnChangeTextAreaValueType => {
    return {type: 'ON-CANGE-TEXT-AREA-VALUE', value}
}
