interface user {
    email: string;
    token: string;
    dateOfLastRequest: Date;
    wordsUsedToday: number;
}

export default user