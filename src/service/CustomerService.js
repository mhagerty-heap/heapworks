import axios from 'axios'

export class CustomerService {
    getCustomersMedium() {
        return axios.get('assets/demo/data/customers-medium.json')
            .then(res => res.data.data);
    }

    getCustomersLarge() {
        return axios.get('assets/demo/data/customers-large.json')
                .then(res => res.data.data);
    }

    getCustomersChecking() {
        return axios.get('assets/demo/data/customers-checking.json')
            .then(res => res.data.data);
    }

    getCustomersSavings() {
        return axios.get('assets/demo/data/customers-savings.json')
            .then(res => res.data.data);
    }

    getCustomersTickets() {
        return axios.get('assets/demo/data/customers-tickets.json')
            .then(res => res.data.data);
    }

    getTickets() {
        return axios.get('assets/demo/data/heapworksTickets.json')
            .then(res => res.data.data);
    }

    getProblems() {
        return axios.get('assets/demo/data/heapworksProblems.json')
            .then(res => res.data.data);
    }

    getChanges() {
        return axios.get('assets/demo/data/heapworksChanges.json')
            .then(res => res.data.data);
    }

    getArticles() {
        return axios.get('assets/demo/data/articles.json')
            .then(res => res.data.data);
    }


}
