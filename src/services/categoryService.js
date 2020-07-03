import ApiService from '../services/apiService';

export default class CategoryService extends ApiService {


    constructor() {
        super('/categories');
    }


    search(searchText, currentPage, categoriesPerPage, sort, sortDir) {

        let params;

        if (searchText === '') {
            params = "?page=" + currentPage + "&size=" + categoriesPerPage + "&sort=" + sort + "," + sortDir;
        } else {
            params = "/find/" + searchText + "?page=" + currentPage + "&size=" + categoriesPerPage + "&sort=" + sort + "," + sortDir;
        }
        return this.get(params);
    }


    deleteById(id) {
        return this.delete(`/${id}`);
    }


    save(category) {
        return this.post('/', category)
    }


    update(category) {
        return this.put('/', category)
    }


    getById(id) {
        return this.get(`/${id}`)
    }
}