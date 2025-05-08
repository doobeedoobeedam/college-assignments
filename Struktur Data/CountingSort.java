public class CountingSort {
    public static void countingSort(int[] arr) {
        int n = arr.length;

        // Mencari nilai maksimum dalam array
        int max = arr[0];
        for (int i = 1; i < n; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }

        // Inisialisasi array count
        int[] count = new int[max + 1];

        // Menghitung jumlah kemunculan setiap elemen dalam array count
        for (int i = 0; i < n; i++) {
            count[arr[i]]++;
        }

        // Mengubah array count untuk menunjukkan posisi setiap elemen dalam array output
        for (int i = 1; i <= max; i++) {
            count[i] += count[i - 1];
        }

        // Membuat array output
        int[] output = new int[n];
        for (int i = n - 1; i >= 0; i--) {
            output[count[arr[i]] - 1] = arr[i];
            count[arr[i]]--;
        }

        // Menyalin array output ke array asli
        for (int i = 0; i < n; i++) {
            arr[i] = output[i];
        }
    }

    public static void printArray(int[] arr) {
        for (int i : arr) {
            System.out.print(i + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        int[] arr = {5, 20, 25, 15, 30, 10};
        System.out.println("Array asli:");
        printArray(arr);

        countingSort(arr);

        System.out.println("Array setelah diurutkan dengan Counting Sort:");
        printArray(arr);
    }
}
