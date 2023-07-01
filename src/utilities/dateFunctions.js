

//2023-06-25

export const formatDate = function(dateString) {
    const [year, month, day] = dateString.split('-');
    return day + "." + month + "." + year
}

