import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_RESET,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_REVIEW_REQUEST,
    PRODUCT_REVIEW_FAIL,
    PRODUCT_REVIEW_SUCCESS,
} from "../types/productConstants";
import axios from "axios";
// import {
//   USER_DELETE_FAIL,
//   USER_DELETE_REQUEST,
//   USER_DELETE_SUCCESS,
// } from '../types/userConstants'
export const listProducts =
    (keyword = "", pageNumber = "") =>
    async (dispatch) => {
        try {
            dispatch({
                type: PRODUCT_DETAILS_RESET,
            });
            dispatch({
                type: PRODUCT_LIST_REQUEST,
            });

            const { data } = await axios.get(
                `/items/allitems?keyword=${keyword}&pageNumber=${pageNumber}`
            );
            dispatch({
                type: PRODUCT_LIST_SUCCESS,
                payload: data,
            });
        } catch (error) {
            console.log(error.response);
            dispatch({
                type: PRODUCT_LIST_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_DETAILS_REQUEST,
        });

        const { data } = await axios.get(`/items/${id}`);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

//delete product by an admin or owner

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST,
        });
        const {
            userLogin: { userData },
        } = getState();
        const config = {
            headers: {
                "auth-token": localStorage.getItem("auth-token"),
            },
        };

        await axios.delete(
            `/items/${id}`,

            config
        );
        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createProduct =
    (
        name,
        images,
        description,
        category,
        expiresOn,
        address,
        shippingCharge,
        price,
        negotiable
    ) =>
    async (dispatch, getState) => {
        try {
            dispatch({
                type: PRODUCT_CREATE_REQUEST,
            });
            const {
                userLogin: { userData },
            } = getState();
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "auth-token": localStorage.getItem("auth-token"),
                },
            };
            console.log("reached here");
            console.log(config);
            const formData = new FormData();
            formData.append("name", name);
            formData.append("file", images);
            formData.append("description", description);
            formData.append("address", address);
            formData.append("category", category);
            formData.append("expiresOn", expiresOn);
            formData.append("shippingCharge", shippingCharge);
            formData.append("price", price);
            formData.append("negotiable", negotiable);
            const { data } = await axios.post(
                `/items/additem`,
                formData,
                config
            );
            dispatch({
                type: PRODUCT_CREATE_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: PRODUCT_CREATE_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

//update product

export const updateProduct =
    (
        id,
        name,
        description,
        category,
        expiresOn,
        address,
        shippingCharge,
        price,
        negotiable
    ) =>
    async (dispatch, getState) => {
        try {
            dispatch({
                type: PRODUCT_UPDATE_REQUEST,
            });
            const {
                userLogin: { userData },
            } = getState();
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "auth-token": localStorage.getItem("auth-token"),
                },
            };
            console.log("reached here");
            console.log(config);
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("address", address);
            formData.append("category", category);
            formData.append("expiresOn", expiresOn);
            formData.append("shippingCharge", shippingCharge);
            formData.append("price", price);
            formData.append("negotiable", negotiable);
            console.log(formData);
            const { data } = await axios
                .put(`/items/${id}`, formData, config)
                .then(() => {
                    console.log("Done");
                })
                .catch((err) => {
                    console.log(err);
                });
            dispatch({
                type: PRODUCT_UPDATE_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: PRODUCT_UPDATE_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

//create review
export const createProductReview =
    (productId, comment) => async (dispatch, getState) => {
        try {
            dispatch({
                type: PRODUCT_REVIEW_REQUEST,
            });
            const {
                userLogin: { userData },
            } = getState();
            const config = {
                headers: {
                    "Content-Type": "application/json",

                    "auth-token": localStorage.getItem("auth-token"),
                },
            };

            await axios.post(
                `/items/${productId}/reviews`,
                { comment },
                config
            );
            dispatch({
                type: PRODUCT_REVIEW_SUCCESS,
            });
        } catch (error) {
            dispatch({
                type: PRODUCT_REVIEW_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
