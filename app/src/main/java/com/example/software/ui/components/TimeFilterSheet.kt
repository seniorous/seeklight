package com.example.software.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CalendarMonth
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Close
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.DatePickerDialog
import androidx.compose.material3.DateRangePicker
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FilterChip
import androidx.compose.material3.FilterChipDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.SheetState
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.rememberDateRangePickerState
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.software.domain.usecase.TimeRange
import com.example.software.ui.theme.GradientEnd
import com.example.software.ui.theme.GradientStart
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

/**
 * 时间筛选 Bottom Sheet
 */
@OptIn(ExperimentalMaterial3Api::class, ExperimentalLayoutApi::class)
@Composable
fun TimeFilterSheet(
    currentTimeRange: TimeRange,
    onTimeRangeSelected: (TimeRange) -> Unit,
    onDismiss: () -> Unit,
    sheetState: SheetState = rememberModalBottomSheetState()
) {
    var showDatePicker by remember { mutableStateOf(false) }
    var selectedRange by remember { mutableStateOf(currentTimeRange) }
    
    ModalBottomSheet(
        onDismissRequest = onDismiss,
        sheetState = sheetState,
        containerColor = MaterialTheme.colorScheme.surface,
        shape = RoundedCornerShape(topStart = 24.dp, topEnd = 24.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 24.dp)
                .padding(bottom = 32.dp)
        ) {
            // 标题
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "选择时间范围",
                    style = MaterialTheme.typography.titleLarge,
                    fontWeight = FontWeight.Bold
                )
                
                IconButton(onClick = onDismiss) {
                    Icon(
                        imageVector = Icons.Default.Close,
                        contentDescription = "关闭",
                        tint = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
            
            Spacer(modifier = Modifier.height(20.dp))
            
            // 快捷选项
            Text(
                text = "快捷选择",
                style = MaterialTheme.typography.labelMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            
            Spacer(modifier = Modifier.height(12.dp))
            
            FlowRow(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                TimeRangeChip(
                    label = "全部",
                    selected = selectedRange is TimeRange.All,
                    onClick = { selectedRange = TimeRange.All }
                )
                TimeRangeChip(
                    label = "今天",
                    selected = selectedRange is TimeRange.Today,
                    onClick = { selectedRange = TimeRange.Today }
                )
                TimeRangeChip(
                    label = "本周",
                    selected = selectedRange is TimeRange.ThisWeek,
                    onClick = { selectedRange = TimeRange.ThisWeek }
                )
                TimeRangeChip(
                    label = "本月",
                    selected = selectedRange is TimeRange.ThisMonth,
                    onClick = { selectedRange = TimeRange.ThisMonth }
                )
                TimeRangeChip(
                    label = "今年",
                    selected = selectedRange is TimeRange.ThisYear,
                    onClick = { selectedRange = TimeRange.ThisYear }
                )
            }
            
            Spacer(modifier = Modifier.height(20.dp))
            
            // 自定义日期
            Text(
                text = "自定义范围",
                style = MaterialTheme.typography.labelMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            
            Spacer(modifier = Modifier.height(12.dp))
            
            // 自定义日期按钮
            Surface(
                onClick = { showDatePicker = true },
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(12.dp),
                color = if (selectedRange is TimeRange.Custom) {
                    MaterialTheme.colorScheme.primaryContainer
                } else {
                    MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f)
                }
            ) {
                Row(
                    modifier = Modifier.padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        imageVector = Icons.Default.CalendarMonth,
                        contentDescription = null,
                        tint = if (selectedRange is TimeRange.Custom) {
                            MaterialTheme.colorScheme.primary
                        } else {
                            MaterialTheme.colorScheme.onSurfaceVariant
                        }
                    )
                    
                    Spacer(modifier = Modifier.width(12.dp))
                    
                    Text(
                        text = when (val range = selectedRange) {
                            is TimeRange.Custom -> {
                                val dateFormat = SimpleDateFormat("yyyy/MM/dd", Locale.getDefault())
                                "${dateFormat.format(Date(range.startMs))} - ${dateFormat.format(Date(range.endMs))}"
                            }
                            else -> "选择日期范围..."
                        },
                        style = MaterialTheme.typography.bodyMedium,
                        color = if (selectedRange is TimeRange.Custom) {
                            MaterialTheme.colorScheme.onPrimaryContainer
                        } else {
                            MaterialTheme.colorScheme.onSurfaceVariant
                        }
                    )
                }
            }
            
            Spacer(modifier = Modifier.height(28.dp))
            
            // 确认按钮
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                OutlinedButton(
                    onClick = {
                        selectedRange = TimeRange.All
                        onTimeRangeSelected(TimeRange.All)
                        onDismiss()
                    },
                    modifier = Modifier.weight(1f),
                    shape = RoundedCornerShape(12.dp)
                ) {
                    Text("重置")
                }
                
                Box(
                    modifier = Modifier
                        .weight(2f)
                        .height(48.dp)
                        .clip(RoundedCornerShape(12.dp))
                        .background(
                            brush = Brush.horizontalGradient(listOf(GradientStart, GradientEnd))
                        )
                        .clickable {
                            onTimeRangeSelected(selectedRange)
                            onDismiss()
                        },
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = "确认",
                        color = Color.White,
                        fontWeight = FontWeight.SemiBold
                    )
                }
            }
        }
    }
    
    // 日期范围选择器
    if (showDatePicker) {
        DateRangePickerDialog(
            onDismiss = { showDatePicker = false },
            onConfirm = { startMs, endMs ->
                selectedRange = TimeRange.Custom(startMs, endMs)
                showDatePicker = false
            }
        )
    }
}

/**
 * 时间范围选择芯片
 */
@Composable
private fun TimeRangeChip(
    label: String,
    selected: Boolean,
    onClick: () -> Unit
) {
    FilterChip(
        selected = selected,
        onClick = onClick,
        label = { Text(label) },
        leadingIcon = if (selected) {
            {
                Icon(
                    imageVector = Icons.Default.Check,
                    contentDescription = null,
                    modifier = Modifier.height(18.dp)
                )
            }
        } else null,
        colors = FilterChipDefaults.filterChipColors(
            selectedContainerColor = MaterialTheme.colorScheme.primaryContainer,
            selectedLabelColor = MaterialTheme.colorScheme.onPrimaryContainer
        ),
        shape = RoundedCornerShape(20.dp)
    )
}

/**
 * 日期范围选择对话框
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun DateRangePickerDialog(
    onDismiss: () -> Unit,
    onConfirm: (startMs: Long, endMs: Long) -> Unit
) {
    val dateRangePickerState = rememberDateRangePickerState()
    
    DatePickerDialog(
        onDismissRequest = onDismiss,
        confirmButton = {
            TextButton(
                onClick = {
                    val startMs = dateRangePickerState.selectedStartDateMillis
                    val endMs = dateRangePickerState.selectedEndDateMillis
                    if (startMs != null && endMs != null) {
                        onConfirm(startMs, endMs)
                    }
                },
                enabled = dateRangePickerState.selectedStartDateMillis != null &&
                         dateRangePickerState.selectedEndDateMillis != null
            ) {
                Text("确认")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("取消")
            }
        }
    ) {
        DateRangePicker(
            state = dateRangePickerState,
            modifier = Modifier.height(500.dp),
            title = {
                Text(
                    text = "选择日期范围",
                    modifier = Modifier.padding(16.dp)
                )
            }
        )
    }
}

/**
 * 时间筛选标签（用于显示当前筛选状态）
 */
@Composable
fun TimeFilterTag(
    timeRange: TimeRange,
    onClear: () -> Unit,
    modifier: Modifier = Modifier
) {
    if (timeRange is TimeRange.All) return
    
    Surface(
        modifier = modifier,
        shape = RoundedCornerShape(20.dp),
        color = MaterialTheme.colorScheme.primaryContainer.copy(alpha = 0.7f)
    ) {
        Row(
            modifier = Modifier.padding(start = 12.dp, end = 4.dp, top = 4.dp, bottom = 4.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = when (val range = timeRange) {
                    is TimeRange.Custom -> {
                        val dateFormat = SimpleDateFormat("MM/dd", Locale.getDefault())
                        "${dateFormat.format(Date(range.startMs))}-${dateFormat.format(Date(range.endMs))}"
                    }
                    else -> timeRange.displayName()
                },
                style = MaterialTheme.typography.labelMedium,
                color = MaterialTheme.colorScheme.onPrimaryContainer
            )
            
            IconButton(
                onClick = onClear,
                modifier = Modifier.height(24.dp).width(24.dp)
            ) {
                Icon(
                    imageVector = Icons.Default.Close,
                    contentDescription = "清除筛选",
                    modifier = Modifier.height(14.dp),
                    tint = MaterialTheme.colorScheme.onPrimaryContainer
                )
            }
        }
    }
}
