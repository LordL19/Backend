export class AssistantService {

    constructor(
        private readonly assistantUrl: string
    ) { }

    async getAll() {
        const response = await fetch(this.assistantUrl).then(res => res.json())
        return response
    }

    async answerQuestion(question: string) {
        const response = await fetch(this.assistantUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ question })
        }).then(res => res.json())
        return response
    }
}