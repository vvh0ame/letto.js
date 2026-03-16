class Letto {
	constructor() {
		this.api = "https://api.letto.app"
		this.messagesApi = "https://msg.letto.app"
		this.headers = {
			"User-Agent": "Dart/3.3 (dart:io)"
		}
	}

	async signIn(email, password) {
		const response = await fetch(
			`${this.api}/sessions?email=${email}&password=${password}`, {
				method: "POST",
				headers: this.headers
			})
		const data = await response.json()
		this.accessToken = data.data.access_token
		this.headers["access-token"] = this.accessToken
		const accountInfo = await this.getAccountInfo()
		this.userId = accountInfo.data.id
		return data
	}

	async signUp(email, password, nickname) {
		const response = await fetch(
			`${this.api}/users?email=${email}&password=${password}&nickname=${nickname}`, {
				method: "POST",
				headers: this.headers
			})
		return response.json()
	}

	async deleteAccount() {
		const response = await fetch(
			`${this.api}/users/self`, {
				method: "DELETE",
				headers: this.headers
			})
		return response.json()
	}

	async getAccountInfo() {
		const response = await fetch(
			`${this.api}/users/self`, {
				method: "GET",
				headers: this.headers
			})
		return response.json()
	}

	async getStatus() {
		const response = await fetch(
			`${this.api}/status?v=5`, {
				method: "GET",
				headers: this.headers
			})
		return response.json()
	}

	async getPosts(all = 1, limit = 20) {
		const response = await fetch(
			`${this.api}/posts?limit=${limit}&all=${all}`, {
				method: "GET",
				headers: this.headers
			})
		return response.json()
	}

	async getTodayQuestions() {
		const response = await fetch(
			`${this.api}/questions/today`, {
				method: "GET",
				headers: this.headers
			})
		return response.json()
	}

	async getQuestions(type = 0, offset = 0, limit = 20) {
		const response = await fetch(
			`${this.api}/questions?type=${type}&limit=${limit}&offset=${offset}`, {
				method: "GET",
				headers: this.headers
			})
		return response.json()
	}

	async getQuestion(questionId) {
		const response = await fetch(
			`${this.api}/questions/${questionId}`, {
				method: "GET",
				headers: this.headers
			})
		return response.json()
	}

	async getDialogs(offset = 0, limit = 15) {
		const response = await fetch(
			`${this.messagesApi}/dialogs?q&offset=${offset}&limit=${limit}`, {
				method: "GET",
				headers: this.headers
			})
		return response.json()
	}

	async getDialog(dialogId) {
		const response = await fetch(
			`${this.messagesApi}/dialogs/${dialogId}`, {
				method: "GET",
				headers: this.headers
			})
		return response.json()
	}

	async getDialogMessages(dialogId) {
		const response = await fetch(
			`${this.messagesApi}/dialogs/${dialogId}/messages`, {
				method: "GET",
				headers: this.headers
			})
		return response.json()
	}

	async getNotifications(offset = 0, limit = 20) {
		const response = await fetch(
			`${this.api}/notifications?offset=${offset}&limit=${limit}`, {
				method: "GET",
				headers: this.headers
			})
		return response.json()
	}

	async getUser(nickname) {
		const response = await fetch(
			`${this.api}/users/${nickname}`, {
				method: "GET",
				headers: this.headers
			})
		return response.json()
	}

	async getUserPosts(userId, limit = 20, all = 1) {
		const response = await fetch(
			`${this.api}/posts?id_user=${userId}&limit=${limit}&all=${all}`, {
				method: "GET",
				headers: this.headers
			})
		return response.json()
	}

	async sendMessage(userId, text, anon = 1) {
		const response = await fetch(
			`${this.messagesApi}/dialogs/0/messages`, {
				method: "POST",
				body: JSON.stringify({
					text: text,
					local_id: Date.now(),
					id_user: userId,
					anon: anon,
					attachments: []
				}),
				headers: this.headers
			})
		return response.json()
	}

	async followUser(userId) {
		const response = await fetch(
			`${this.api}/users/${userId}/follow`, {
				method: "POST",
				headers: this.headers
			})
		return response.json()
	}

	async unfollowUser(userId) {
		const response = await fetch(
			`${this.api}/users/${userId}/follow`, {
				method: "DELETE",
				headers: this.headers
			})
		return response.json()
	}

	async blockUser(userId) {
		const response = await fetch(
			`${this.api}/users/${userId}/block`, {
				method: "POST",
				headers: this.headers
			})
		return response.json()
	}

	async unBlockUser(userId) {
		const response = await fetch(
			`${this.api}/users/${userId}/block`, {
				method: "DELETE",
				headers: this.headers
			})
		return response.json()
	}

	async hideUserPosts(userId) {
		const response = await fetch(
			`${this.api}/users/${userId}/posts/hide`, {
				method: "POST",
				headers: this.headers
			})
		return response.json()
	}

	async unHideUserPosts(userId) {
		const response = await fetch(
			`${this.api}/users/${userId}/posts/show`, {
				method: "POST",
				headers: this.headers
			})
		return response.json()
	}
}

module.exports = {Letto}
