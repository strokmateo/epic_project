using System;
using System.Collections.Generic;

namespace Backend.Services
{
    public class MatrixInputParser
    {
        public (int n, int[][] matrix) Parse(string input)
        {
            var lines = input.Split('\n', StringSplitOptions.RemoveEmptyEntries);

            if (lines.Length < 1)
            {
                throw new ArgumentException("Input must contain at least one line");
            }
            int n = int.Parse(lines[0].Trim());

            if (lines.Length - 1 != n)
                throw new ArgumentException("Row count doesn't match matrix size");

            int[][] matrix = new int[n][];

            for (int i = 0; i < n; ++i)
            {
                matrix[i] = Array.ConvertAll(lines[i + 1].Trim().Split(' '), int.Parse);
            }

            return (n, matrix);
        }
    }
}
