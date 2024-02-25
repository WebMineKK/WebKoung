import { notification } from 'antd';

function alertSuccess({ title, label }) {
    notification.success({
        placement: 'topLeft',
        message: <p style={{ fontFamily: 'Noto Sans Lao', fontWeight: 'bold' }}> {title}</p>,
        description: <p style={{ fontFamily: 'Noto Sans Lao' }}>{label}</p>,
    });
}

function alertWarning({ title, label }) {
    notification.warning({
        placement: 'topLeft',
        message: <p style={{ fontFamily: 'Noto Sans Lao', fontWeight: 'bold' }}> {title}</p>,
        description: <p style={{ fontFamily: 'Noto Sans Lao' }}>{label}</p>,
    });
}

function alertError({ title, label }) {
    notification.error({
        placement: 'topLeft',
        message: <p style={{ fontFamily: 'Noto Sans Lao', fontWeight: 'bold' }}> {title}</p>,
        description: <p style={{ fontFamily: 'Noto Sans Lao' }}>{label}</p>,
    });
}

export { alertSuccess, alertWarning, alertError }