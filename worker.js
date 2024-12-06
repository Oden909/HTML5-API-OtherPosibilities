self.onmessage = (event) => {
    const number = parseFloat(event.data);
    if (isNaN(number) || !Number.isFinite(number)) {
        self.postMessage('Ошибка: Введите корректное число!');
        return;
    }
    if (!Number.isInteger(number)) {
        self.postMessage('Ошибка: Введите целое число!');
        return;
    }
    if (number < 0) {
        self.postMessage('Ошибка: Введите положительное число!');
        return;
    }
    let result = 1;
    for (let i = 1; i <= number; i++) {
        result *= i;
    }
    self.postMessage(result);
};
self.onerror = (error) => {
    console.error('Ошибка в воркере:', error);
    self.postMessage('Произошла ошибка!');
};
