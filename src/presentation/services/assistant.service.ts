export class AssistantService {
    private readonly url = "https://avu-p472pmh57q-rj.a.run.app/questions";

    async getAll() {
        const response = await fetch(this.url).then(res => res.json())
        return response
    }
    
    async answerQuestion(question: string) {
        const response = await fetch(this.url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ question })
        }).then(res => res.json())
        return response
    }
}