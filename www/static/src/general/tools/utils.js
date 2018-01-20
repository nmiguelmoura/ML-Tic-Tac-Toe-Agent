/**
 * Created by Nuno on 27/09/17.
 */
nmm.tools.utils = {
    shuffleArray:function(array){
        //Fisher-Yates Shuffle
        //numero de elementos a trocar
        var length = array.length,
            temp,
            index;

        while (length > 0) {
            //escolher um index ao acaso
            index = Math.floor(Math.random() * length);

            //diminuir o numero de elementos a trocar
            length--;

            //pode ser length porque length foi diminuida previamente
            temp = array[length];
            array[length] = array[index];
            array[index] = temp;
        }
        return array;
    },
    hitTestRectangle:function(obj,area,treshold){
        if(obj.x>area.x+treshold.x && obj.x<area.x+area.w-treshold.x){
            if(obj.y>area.y+treshold.y && obj.y<area.y+area.h-treshold.y){
                return true;
            }
        }
        return false;
    }
};