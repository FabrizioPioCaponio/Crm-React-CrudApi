import { fetchEndPoint } from "./FetchEndPoint";

const FIND_BY_PRIMARY_KEY = '/crm.lead/find-by-primary-key';
const FIND_BY_NAME = '/crm.lead/find-by-name';
const UPDATE_LEAD = '/crm.lead/update-lead';
const FIND_ALL = '/crm.lead/find-all';
const DELETE_LEAD = '/crm.lead/delete-lead';

export function findByPrimaryKey(params){
    return fetchEndPoint(FIND_BY_PRIMARY_KEY, params);
}

export function findByName(params){
    return fetchEndPoint(FIND_BY_NAME, params);
}

export function updateLead(params){
    return fetchEndPoint(UPDATE_LEAD, params);
}

export function findAll(params){
    return fetchEndPoint(FIND_ALL, params);
}

export function deleteLead(params){
    return fetchEndPoint(DELETE_LEAD, params);
}