import axios from "axios";

const axiosInsatance = axios.create({
    baseURL:"http://localhost:3000",
    timeout:10000, //10s,
    withCredentials:true

})


// Response interceptor for error handling
axiosInsatance.interceptors.response.use(
    (response) => {
        // Log successful response for debugging
        console.log(`Response received from: ${response.config.url}`, response.status);
        return response;
    },
    (error) => {
        let errorMessage = 'An unexpected error occurred';
        let errorType = 'UNKNOWN_ERROR';

        if (error.response) {
            // Server responded with error status
            const { status, data } = error.response;
            
            switch (status) {
                case 400:
                    errorMessage = data?.message || 'Bad request - please check your input';
                    errorType = 'BAD_REQUEST';
                    break;
                case 401:
                    errorMessage = 'Unauthorized - please login again';
                    errorType = 'UNAUTHORIZED';
                    break;
                case 403:
                    errorMessage = 'Forbidden - you don\'t have permission to access this resource';
                    errorType = 'FORBIDDEN';
                    break;
                case 404:
                    errorMessage = 'Resource not found';
                    errorType = 'NOT_FOUND';
                    break;
                case 422:
                    errorMessage = data?.message || 'Validation error - please check your input';
                    errorType = 'VALIDATION_ERROR';
                    break;
                case 429:
                    errorMessage = 'Too many requests - please try again later';
                    errorType = 'RATE_LIMIT';
                    break;
                case 500:
                    errorMessage = 'Server error - please try again later';
                    errorType = 'SERVER_ERROR';
                    break;
                case 502:
                    errorMessage = 'Bad gateway - server is temporarily unavailable';
                    errorType = 'BAD_GATEWAY';
                    break;
                case 503:
                    errorMessage = 'Service unavailable - please try again later';
                    errorType = 'SERVICE_UNAVAILABLE';
                    break;
                default:
                    errorMessage = data?.message || `Server error (${status})`;
                    errorType = 'HTTP_ERROR';
            }

            console.error(`HTTP Error ${status}:`, {
                url: error.config?.url,
                method: error.config?.method,
                data: data,
                message: errorMessage
            });

        } else if (error.request) {
            // Request was made but no response received
            errorMessage = 'No response from server - please check your internet connection';
            errorType = 'NETWORK_ERROR';
            console.error('Network error:', {
                url: error.config?.url,
                method: error.config?.method,
                message: 'No response received'
            });

        } else if (error.code === 'ECONNABORTED') {
            // Request timeout
            errorMessage = 'Request timed out - please try again';
            errorType = 'TIMEOUT_ERROR';
            console.error('Timeout error:', {
                url: error.config?.url,
                method: error.config?.method,
                timeout: error.config?.timeout
            });

        } else {
            // Something else happened
            errorMessage = error.message || 'An unexpected error occurred';
            errorType = 'UNKNOWN_ERROR';
            console.error('Unknown error:', error);
        }

        // Return a standardized error object
        return Promise.reject({
            type: errorType,
            message: errorMessage,
            status: error.response?.status,
            data: error.response?.data,
            originalError: error
        });
    }
);

export default axiosInsatance;