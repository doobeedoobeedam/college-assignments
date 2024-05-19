public class MergeSort {
    
    // Method untuk menggabungkan dua sub-array
    private static void merge(int[] arr, int left, int mid, int right) {
        int n1 = mid - left + 1;
        int n2 = right - mid;

        int[] leftArray = new int[n1];
        int[] rightArray = new int[n2];

        // Menyalin data ke sub-array
        for (int i = 0; i < n1; ++i)
            leftArray[i] = arr[left + i];
        for (int j = 0; j < n2; ++j)
            rightArray[j] = arr[mid + 1 + j];

        int i = 0, j = 0;
        int k = left;

        // Menggabungkan sub-array ke dalam array utama
        while (i < n1 && j < n2) {
            if (leftArray[i] <= rightArray[j]) {
                arr[k] = leftArray[i];
                i++;
            } else {
                arr[k] = rightArray[j];
                j++;
            }
            k++;
        }

        // Menyalin sisa elemen dari leftArray
        while (i < n1) {
            arr[k] = leftArray[i];
            i++;
            k++;
        }

        // Menyalin sisa elemen dari rightArray
        while (j < n2) {
            arr[k] = rightArray[j];
            j++;
            k++;
        }
    }

    // Method untuk mengurutkan array menggunakan Merge Sort
    private static void mergeSort(int[] arr, int left, int right) {
        if (left < right) {
            int mid = (left + right) / 2;

            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);

            merge(arr, left, mid, right);
        }
    }

    public static void main(String[] args) {
        int[] arr = {12, 11, 13, 5, 6, 7}; 
        System.out.println("Array asli:");
        for (int value : arr) {
            System.out.print(value + " ");
        }
        System.out.println();

        mergeSort(arr, 0, arr.length - 1);

        System.out.println("Array setelah diurutkan dengan Merge Sort:");
        for (int value : arr) {
            System.out.print(value + " ");
        }
    }
}
