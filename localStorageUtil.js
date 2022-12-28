class LocalStorageUtil {
    getCount() {
        const countLocalStorage = localStorage.getItem('count');
        if (countLocalStorage !== null) {
            return JSON.parse(countLocalStorage);
        }
        return [];
    }

    getFood() {
        const foodLocalStorage = localStorage.getItem('food');
        if (foodLocalStorage !== null) {
            return JSON.parse(foodLocalStorage);
        }
        return [];
    }

    putFood(id, newCount) {
        let food = this.getFood();
        let count = this.getCount();

        const index = food.indexOf(id);
        if (index === -1) {
            food.push(id);
            count.push(newCount);
        } else {
            let newNumb = Number.parseInt(count[index]) + Number.parseInt(newCount);
            if (newNumb > 0)
                count.splice(index, 1, newNumb);
        }

        localStorage.setItem('food', JSON.stringify(food));
        localStorage.setItem('count', JSON.stringify(count));
    }

    deleteFood(id) {
        let food = localStorageUtil.getFood();
        let count = localStorageUtil.getCount();

        const index = food.indexOf(id + '');

        food.splice(index, 1);
        count.splice(index, 1);

        localStorage.setItem('food', JSON.stringify(food));
        localStorage.setItem('count', JSON.stringify(count));

        shoppingPage.render();
        headerPage.render();
    }
}

const localStorageUtil = new LocalStorageUtil();