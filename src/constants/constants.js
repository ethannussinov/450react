export const API_PORT = "8080";

export const API_BASE_URL = `http://127.0.0.1:${API_PORT}/api`;

export const API_ENDPOINTS = {
    GET_DASHBOARD_DATA: `${API_BASE_URL}/dashboard-data/`,
    GET_DISTRICT_DATA: `${API_BASE_URL}/get_district_data/`,
};

export const METRIC_CATEGORIES = {
    DEMOGRAPHICS: [
        "enrollment_black_pct",
        "enrollment_hispanic_pct",
        "enrollment_asian_pct",
        "enrollment_white_pct",
    ],
    DISCIPLINE: [
        "discipline_incidents_rate",
        "discipline_removal_in_schl_susp_rate",
        "discipline_removal_out_schl_susp_rate",
        "discipline_removal_expulsion_rate",
        "discipline_more_10_days_rate",
    ],
};

export const DEFAULTS = {
    YEAR_RANGE: [1991, 2023],
    SLIDER_STYLE: {
        trackStyle: [{ backgroundColor: "#007bff" }],
        handleStyle: [
            { borderColor: "#007bff", backgroundColor: "#fff" },
            { borderColor: "#007bff", backgroundColor: "#fff" },
        ],
        railStyle: { backgroundColor: "#ddd" },
    },
};

export const ERROR_MESSAGES = {
    MULTIPLE_SELECTION: "You can select multiple districts OR multiple metrics, but not both.",
    FETCH_FAILURE: "Error fetching data. Please try again later.",
};
