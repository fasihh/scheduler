const getDate = (raw_date) => {
    const date_obj = new Date(raw_date);
    const date = date_obj.getDate().toString().padStart(2, '0');
    const month = date_obj.getMonth().toString().padStart(2, '0');
    const year = date_obj.getFullYear();
    const hours = date_obj.getHours().toString().padStart(2, '0');
    const minutes = date_obj.getMinutes().toString().padStart(2, '0');

    return `${date}-${month}-${year}, ${hours}:${minutes}`;
}

export default getDate;